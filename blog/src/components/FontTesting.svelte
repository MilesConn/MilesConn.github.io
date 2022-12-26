<script lang="ts">
  import { objectToCss } from "src/lib/objectToCss";

  // https://github.com/undercasetype/Fraunces#variable-axes
  let opticalSize = 144;
  let weight = 900;
  let softness = 100;
  let wonky = 1;
  let size = 18;

  // Is there a way to put this into a library function? probably
  let styles;
  $: styles = {
    "optical-size": `"opsz" ${opticalSize}`,
    weight: `"wght" ${weight}`,
    softness: `"SOFT" ${softness}`,
    wonky: `"WONK" ${wonky}`,
    size: `${size}px`,
  };

  $: cssVarStyles = objectToCss(styles);
</script>

<div style={cssVarStyles}>
  <p class="SOFT">Welcome to my hidden page. WONK</p>
  <p class="WONK">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <label>
    <input type="range" min="0" max="100" bind:value={size} />
    Size
  </label>
  <label>
    <input type="range" min="9" max="144" bind:value={opticalSize} />
    Optical Size
  </label>
  <label>
    <input type="range" min="100" max="900" bind:value={weight} />
    Weight
  </label>
  <label>
    <input type="range" min="0" max="100" bind:value={softness} />
    Softness
  </label>
  <label>
    <input type="range" min="0" max="1" bind:value={wonky} />
    Wonky
  </label>
</div>

<style>
  p {
    color: red;
  }
  .WONK {
    font-size: var(--size);
    font-family: "Fraunces";
    font-variation-settings: var(--weight), var(--softness), var(--wonky),
      var(--optical-size);
  }

  .SOFT {
    font-family: "Fraunces";
    color: blue;
    font-variation-settings: "WONK" 0;
  }
</style>
