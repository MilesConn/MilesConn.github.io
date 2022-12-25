<script lang="ts">
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { elasticInOut } from "svelte/easing";
  //   We should prob add the route for this page
  let ready = false;
  let timerUp = false;
  onMount(() => (ready = true));
  const customTransition = () => {
    return {
      // T \in [0,1]
      css: (t: number) => {
        return `
        transform: scale(${t});
        `;
      },
      easing: elasticInOut,
      duration: 2000,
    };
  };
  //   setInterval(() => (timerUp = true), 2000);
</script>

<!-- {@debug ready} -->

<div>
  <!-- TODO: make color change on wall hit -->
  <div class="x">
    <div class="y">
      <h1 class="howdy" in:customTransition>404 PAGE NOT FOUND :></h1>
    </div>
  </div>
</div>

<style>
    /* GET SIZE OF H1 tag */
  .x {
    animation: x 13s linear infinite alternate;
  }

  .y {
    animation: y 7s linear infinite alternate;
  }

  @keyframes x {
    100% {
      transform: translateX(calc(100vw));
    }
  }

  @keyframes y {
    100% {
      transform: translateY(calc(100vh));
    }
  }
</style>
