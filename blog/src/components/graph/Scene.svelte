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
  import * as THREE from "three";
  import Graph from "./Graph.svelte";

  const fov = 40;
  let near = 10;
  const far = 7000;

  // TODO: add even listener
  // window.addEventListener('resize', () => {
  //   width = window.innerWidth;
  //   viz_width = width;
  //   height = window.innerHeight;

  //   renderer.setSize(width, height);
  //   camera.aspect = width / height;
  //   camera.updateProjectionMatrix();
  // })

  const lookAtVector = new THREE.Vector3(0, 0.5, 0);
  const camera = new THREE.PerspectiveCamera(fov);
  // The camera position affects the ray cast behaviour which makes sense....?
  // does that make sense?
  //TODO:
  // get mouse coords correct
  camera.position.set(0, 0, far);
  lookAtVector.applyQuaternion(camera.quaternion);

  function onClick(e: CustomEvent<ThreltePointerEvent>) {
    console.log("Clicked: ", e);
  }
</script>

<div>
  <Canvas>
    <Three type={camera} />
    <Graph camera2={camera} />
  </Canvas>
</div>

<style>
  div {
    background-color: white;
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
