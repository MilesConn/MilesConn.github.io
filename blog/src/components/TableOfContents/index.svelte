<script lang="ts">
  import ArrowTl from "../Icons/ArrowTl.svelte";
  import ArrowTr from "../Icons/ArrowTr.svelte";
  import { slide } from "svelte/transition";
  import FontTesting from "../pages/FontTesting.svelte";
  import { linear } from "svelte/easing";

  let isOpen = true;

  const iconSize = "24px";
  const strokeWidth = "1.5";

  type Heading = {
    depth: number;
    slug: string;
    text: string;
  };

  export let headings: Heading[] = [];

  function toggleButton() {
    isOpen = !isOpen;
  }

  $: rotationStyle = isOpen
    ? "transform: rotate(180deg); transition: transform 0.3s;"
    : "transform: rotate(-90); transition: transform 0.3s;";
</script>

<!-- TODO: We learned we can apply styles with with tailwind apply but not inline which is :(  -->
<!-- Hover doesn't work but like text styles do? -->
<!-- Something to do with pointer events? -->

{#if headings.length !== 0}
  <div class="flex flex-col space-y-2">
    <div class="flex items-center space-x-2">
      <button on:click={toggleButton}>
        <div style={rotationStyle}>
          <ArrowTl size={iconSize} {strokeWidth} />
        </div>
      </button>
      <span class="text-lg font-semibold">Table of Contents</span>
    </div>
    {#if isOpen}
      <div transition:slide={{ duration: 300 }}>
        <ul class={`pl-6`}>
          {#each headings as heading}
            <!-- TODO: couldn't get tailwind to work so had to do it by hand...  -->
            <!-- I think this will never work because of how tailwind works.default.. -->
            <!-- there's some random white line on the page that's made by display: list-item so we manually override it -->
            <li
              class={`pl-${heading.depth * 3} flex`}
              style="padding-left: {heading.depth * 0.75}rem;"
            >
              <a
                href="#{heading.slug}"
                class="text-black no-underline hover:text-blue-500"
              >
                {heading.text}
              </a>
              {#if heading.depth === 1}
                <hr />
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
{/if}
<!-- https://docs.astro.build/en/guides/markdown-content/#syntax-highlighting -->
