<script lang="ts">
  import {
    Canvas,
    OrbitControls,
    PerspectiveCamera,
    DirectionalLight,
    AmbientLight,
    MeshInstance,
    ThreltePointerEvent,
    Object3DInstance,
    Three,
    useFrame,
    T,
  } from "@threlte/core";
  import { BufferGeometry, Points, PointsMaterial } from "three";
  import * as THREE from "three";

  // This is a companion pen to go along with https://beta.observablehq.com/@grantcuster/using-three-js-for-2d-data-visualization. It shows a three.js pan and zoom example using d3-zoom working on 100,000 points. The code isn't very organized here so I recommend you check out the notebook to read about what is going on.

  // For some reason the camera that I Get in frame loop is
  // not the one I need idk
  export let camera2: THREE.PerspectiveCamera;

  let point_num = 100000;

  let width = window.innerWidth;
  let viz_width = width;
  let height = window.innerHeight;

  let fov = 40;
  let near = 10;
  let far = 7000;

  // TODO: add even listener
  // window.addEventListener('resize', () => {
  //   width = window.innerWidth;
  //   viz_width = width;
  //   height = window.innerHeight;

  //   renderer.setSize(width, height);
  //   camera.aspect = width / height;
  //   camera.updateProjectionMatrix();
  // })

  let color_array = [
    "#1f78b4",
    "#b2df8a",
    "#33a02c",
    "#fb9a99",
    "#e31a1c",
    "#fdbf6f",
    "#ff7f00",
    "#6a3d9a",
    "#cab2d6",
    "#ffff99",
  ];

  // Add canvas
  //   let renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(width, height);
  //   document.body.appendChild(renderer.domElement);

  //   let zoom = d3
  //     .zoom()
  //     .scaleExtent([getScaleFromZ(far), getScaleFromZ(near)])
  //     .on("zoom", () => {
  //       let d3_transform = d3.event.transform;
  //       zoomHandler(d3_transform);
  //     });

  //   view = d3.select(renderer.domElement);
  //   function setUpZoom() {
  //     view.call(zoom);
  //     let initial_scale = getScaleFromZ(far);
  //     var initial_transform = d3.zoomIdentity
  //       .translate(viz_width / 2, height / 2)
  //       .scale(initial_scale);
  //     zoom.transform(view, initial_transform);
  //     camera.position.set(0, 0, far);
  //   }
  //   setUpZoom();

  const circle_sprite = new THREE.TextureLoader().load(
    "public/circle-sprite.png"
    // "https://fastforwardlabs.github.io/visualization_assets/circle-sprite.png"
  );

  console.log("Circle sprite: ", circle_sprite);

  let radius = 2000;

  // Random point in circle code from https://stackoverflow.com/questions/32642399/simplest-way-to-plot-points-randomly-inside-a-circle
  function randomPosition(radius) {
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * radius * radius;
    var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
    return [pt_x, pt_y];
  }

  let data_points: [number, number, number][] = [];
  for (let i = 0; i < 1; i++) {
    // let position = randomPosition(radius);
    // let name = "Point " + i;
    // let group = Math.floor(Math.random() * 6);
    // let point = { position, name, group };
    // const points: [number, number, number] = [Math.random(), Math.random(), 3];
    const points: [number, number, number] = [0, 0, 3];
    data_points.push(points);
  }

  const generated_points = data_points;
  console.log("GENERATED POINTS:", data_points);

  const pointsGeometry = new THREE.BufferGeometry();

  pointsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(generated_points.flat()), 3)
  );

  const dotMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xff0000,
    map: circle_sprite,
    vertexColors: true,
    transparent: true,
  });

  let colors = [];
  //   for (let datum of generated_points) {
  //     // Set vector coordinates from data
  //     let vertex = new THREE.Vector3(datum.position[0], datum.position[1], 0);
  //     // pointsGeometry.vertices.push(vertex);
  //     // itemSize = 3 because there are 3 values (components) per vertex
  //     pointsGeometry.setAttribute(
  //       "position",
  //       new THREE.BufferAttribute(vertex, 3)
  //     );
  //     let color = new THREE.Color(color_array[datum.group]);
  //     colors.push(color);
  //   }

  //   pointsGeometry.colors = colors;

  const points = new THREE.Points(pointsGeometry, dotMaterial);

  function getScaleFromZ(camera_z_position) {
    let half_fov = fov / 2;
    let half_fov_radians = toRadians(half_fov);
    let half_fov_height = Math.tan(half_fov_radians) * camera_z_position;
    let fov_height = half_fov_height * 2;
    let scale = height / fov_height; // Divide visualization height by height derived from field of view
    return scale;
  }

  function getZFromScale(scale) {
    let half_fov = fov / 2;
    let half_fov_radians = toRadians(half_fov);
    let scale_height = height / scale;
    let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
    return camera_z_position;
  }

  function toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  // Hover and tooltip interaction

  const raycaster = new THREE.Raycaster(
    new THREE.Vector3(0),
    new THREE.Vector3(0, 0.5, 0).normalize()
  );
  raycaster.params.Points.threshold = 100;

  const pointer = new THREE.Vector2();

  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  //   view.on("mousemove", () => {
  //     let [mouseX, mouseY] = d3.mouse(view.node());
  //     let mouse_position = [mouseX, mouseY];
  //     checkIntersects(mouse_position);
  //   });

  function mouseToThree(mouseX, mouseY) {
    return new THREE.Vector3(
      (mouseX / viz_width) * 2 - 1,
      -(mouseY / height) * 2 + 1,
      1
    );
  }

  let x: any[] = [];

  useFrame(({ camera }) => {
    // console.log(pointer);
    // get(camera) // came
    // get(camera);
    // camera.set
    // TODO: we need to figure out the mouse coords because right now they're slightly off
    // and ray casting is not working
    raycaster.setFromCamera(pointer, camera2);
    const intersections = raycaster.intersectObject(points);
    const intersection = intersections.length > 0 ? intersections[0] : null;
    console.log("Intersections L: ", intersections.length);

    if (intersection) {
      let sorted_intersects = sortIntersectsByDistanceToRay(intersections);
      let intersect = sorted_intersects[0];
      let index = intersect.index;
      let datum = generated_points[index];
      highlightPoint(datum);
    } else {
      removeHighLights();
    }
    // Okay so the issue is there is only one object and we need to make them
    // all indiviudal objects
    // console.log("INTERSECTION : ", intersection.object.uuid);
  });

  function highlightPoint(datum: [number, number, number]) {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(datum), 3)
    );

    let material = new THREE.PointsMaterial({
      size: 26,
      sizeAttenuation: false,
      color: 0xff0000,
      map: circle_sprite,
      transparent: true,
    });

    let point = new THREE.Points(geometry, material);
    // hoverContainer.add(point);
    points.add(point);
    x.push(point);
  }

  function sortIntersectsByDistanceToRay(
    intersections: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
  ) {
    return intersections.sort((a, b) => b.distanceToRay - a.distanceToRay);
  }

  function removeHighLights() {
    if (x) {
      x.forEach((y) => points.remove(y));
      x = [];
    }
  }
</script>

<svelte:window on:mousemove={onPointerMove} />
<Three type={points} />
<!-- <Three type={Points}>
  <Three type={pointsGeometry} />
  <Three type={BufferGeometry}
    size={0.1}
    color={0xff0000}
    map={circle_sprite}
    vertexColors
    transparent
  />
</Three> -->
