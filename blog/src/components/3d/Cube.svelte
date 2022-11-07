<script lang="ts">
  import { Mesh, useFrame } from "@threlte/core";
  import { BoxGeometry, MeshBasicMaterial, Color, ShaderMaterial } from "three";

  //   import vertex from "./shaders/shader.vert";
  //   import fragment from "./shaders/shader.frag";
  const vertex = document.querySelector("#vert").textContent.trim();
  const fragment = document.querySelector("#frag").textContent.trim();

  const ColorShiftMaterial = new ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new Color(0.05, 0.2, 0.025) },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
  });

  let rotation = 0;
  useFrame(() => {
    rotation += 0.01;
  });
</script>

<Mesh
  rotation={{ x: rotation, y: rotation, z: rotation }}
  geometry={new BoxGeometry(1, 1, 1)}
  material={ColorShiftMaterial}
/>
