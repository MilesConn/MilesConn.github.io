<script>
  import {
    Mesh,
    Canvas,
    OrbitControls,
    PerspectiveCamera,
    DirectionalLight,
    AmbientLight,
  } from "@threlte/core";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { BoxGeometry, MeshBasicMaterial } from "three";
</script>

<div>
  <Canvas>
    <PerspectiveCamera position={{ x: 10, y: 10, z: 10 }} fov={8}>
      <OrbitControls
        maxPolarAngle={DEG2RAD * 80}
        autoRotate={false}
        enableZoom={false}
        target={{ y: 0.5 }}
      />
    </PerspectiveCamera>

    <DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
    <DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
    <AmbientLight intensity={0.2} />

    <Mesh
      geometry={new BoxGeometry(1, 1, 1)}
      material={new MeshBasicMaterial()}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
    width: 100%;
  }
</style>
