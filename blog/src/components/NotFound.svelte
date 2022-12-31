<script lang="ts">
  import { objectToCss } from "src/lib/objectToCss";
  import { onDestroy, onMount } from "svelte";
  import { quintInOut } from "svelte/easing";
  //   We should prob add the route for this page
  let ready = false;
  const animationDelayMs = 2000;
  onMount(() => (ready = true));
  const customTransition = () => {
    return {
      // T \in [0,1]
      css: (t: number) => {
        return `
        transform: scale(${t});
        `;
      },
      easing: quintInOut,
      duration: animationDelayMs,
    };
  };

  let url = ``;
  let clicks = 0;
  function onClick() {
    clicks++;
    bodyColor = randomColor();
  }

  let textColor = "000000";
  let bodyColor = "ffffff";

  let styles;
  $: styles = {
    "animation-delay": `${animationDelayMs}ms`,
    "text-color": `#${textColor}`,
    "body-color": `#${bodyColor}`,
  };

  let cssVarStyles;
  $: cssVarStyles = objectToCss(styles);

  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  onMount(() => (url = window.location.href));
  const xPeriod = 13000;
  const yPeriod = 7000;
  function setColor() {
    textColor = randomColor();
  }
  let count: any[] = [];
  setTimeout(() => {
    count = [setInterval(setColor, xPeriod), setInterval(setColor, yPeriod)];
  }, animationDelayMs);

  onDestroy(() => count.forEach(clearInterval));
</script>

<!-- {@debug ready} -->

<body style={cssVarStyles}>
  <div class="box">
    <!-- TODO: make color change on wall hit -->
    <!-- MAKE ANIMATION START AFTER SVELTE ANIMATION -->
    {#if ready}
      <div class="x" in:customTransition>
        <div class="y">
          <h1 class="howdy">
            <!-- TODO add clicked log -->
            404 PAGE
            <button class="button" on:click|preventDefault={onClick}
              >{url}</button
            > NOT FOUND
          </h1>
          <p>
            you can try clicking the link again it probably won't work the
            second time
          </p>
          <p>Wow you really clicked it {clicks} times. Good for you</p>
        </div>
      </div>
    {/if}
  </div>
</body>

<style>
  body {
    background-color: var(--body-color);
    margin: 0;
    @apply min-h-screen;
  }
  .box {
    width: 20vw;
    height: 30vh;
    color: var(--text-color);
  }
  .x {
    /* There's definitely a special relationship here I'm forgetting about their periods*/
    animation: x 13s linear infinite alternate;
    /* Animating div x ends up adding its own delay */
    /* animation-delay: var(--animation-delay); */
  }
  button {
    all: unset;
    cursor: pointer;
    color: blue;
  }

  .y {
    animation: y 7s linear infinite alternate;
    animation-delay: var(--animation-delay);
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
