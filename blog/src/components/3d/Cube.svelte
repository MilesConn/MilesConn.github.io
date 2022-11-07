<script>
  import { Mesh, useFrame } from "@threlte/core";
  import { BoxGeometry, MeshBasicMaterial } from "three";

  let rotation = 0;
  useFrame(() => {
    rotation += 0.01;
  });
</script>

<Mesh
  rotation={{ x: rotation, y: rotation, z: rotation }}
  geometry={new BoxGeometry(1, 1, 1)}
  material={new MeshBasicMaterial()}
/>
