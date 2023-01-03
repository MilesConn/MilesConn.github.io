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
  import TextSprite from "@seregpie/three.text-sprite";
  import * as THREE from "three";
  import { Vec2, Vector3 } from "three";

  // This is a companion pen to go along with https://beta.observablehq.com/@grantcuster/using-three-js-for-2d-data-visualization. It shows a three.js pan and zoom example using d3-zoom working on 100,000 points. The code isn't very organized here so I recommend you check out the notebook to read about what is going on.

  // For some reason the camera that I Get in frame loop is
  // not the one I need idk but apparently get(camera) --> camera?
  export let camera2: THREE.PerspectiveCamera;

  const point_num = 100;

  const width = window.innerWidth;
  const viz_width = width;
  const height = window.innerHeight;

  const fov = 40;

  const circle_sprite = new THREE.TextureLoader().load(
    "public/circle-sprite.png"
  );

  const thielFunction = () => Math.random() * 2 - 1;

  let data_points: [number, number, number][] = [];
  for (let i = 0; i < point_num; i++) {
    const points: [number, number, number] = [
      thielFunction(),
      thielFunction(),
      3,
    ];
    // const points: [number, number, number] = [0, 0, 3];
    data_points.push(points);
  }

  const generated_points = data_points;
  console.log("GENERATED POINTS Length:", data_points.length);

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

  const raycaster = new THREE.Raycaster(
    new THREE.Vector3(0),
    // noramlize normalize normalize
    new THREE.Vector3(0, 0.5, 0).normalize()
  );
  raycaster.params.Points.threshold = 100;

  const pointer = new THREE.Vector2();

  const text = new TextSprite({
    text: "Starting text",
    fontSize: 1,
    color: "black",
  });

  text.position.set(0, 0, 0);

  function onPointerMove(event) {
    // This actually should probably not be window height / width
    // but definitely 100000% should be canvas height / width
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    updateText(pointer);
  }

  function updateText(newPos: Vec2) {
    const worldV = new Vector3(newPos.x, newPos.y, 0);
    const tv = text.worldToLocal(worldV);
    // text.position.set(worldV.x, worldV.y, 0);

    // text.position.set(newPos.x, newPos.y, 0);
    text.text = JSON.stringify({ x: newPos.x, y: newPos.y });
  }

  let x: any | undefined;

  useFrame(({ camera }) => {
    // console.log(JSON.stringify({ x: pointer.x, y: pointer.y }));
    // get(camera) // came
    // get(camera);
    // camera.set
    // TODO: we need to figure out the mouse coords because right now they're slightly off
    // and ray casting is not working
    raycaster.setFromCamera(pointer, camera2);
    const intersections = raycaster.intersectObject(points);
    const intersection = intersections.length > 0 ? intersections[0] : null;

    if (intersection) {
      let sorted_intersects = sortIntersectsByDistanceToRay(intersections);
      let intersect = sorted_intersects[0];
      let index = intersect.index;

      // points.getObjectById(intersection.instanceId)
      let datum = generated_points[index];
      highlightPoint(datum);
    } else {
      removeHighLights();
    }
  });

  function highlightPoint(datum: [number, number, number]) {
    if (x) {
      return;
    }
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
    x = point;
  }

  function sortIntersectsByDistanceToRay(
    intersections: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
  ) {
    return intersections.sort((a, b) => b.distanceToRay - a.distanceToRay);
  }

  function removeHighLights() {
    if (x) {
      points.remove(x);
      x = undefined;
    }
  }
</script>

<svelte:window on:mousemove={onPointerMove} />
<Three type={points} />
<Three type={text} />
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
