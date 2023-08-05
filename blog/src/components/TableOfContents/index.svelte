<script lang="ts">
  import ArrowTl from "../Icons/ArrowTl.svelte";
  import ArrowTr from "../Icons/ArrowTr.svelte";
  import { slide } from "svelte/transition";
  import FontTesting from "../pages/FontTesting.svelte";

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
</script>

<!-- TODO: We learned we can apply styles with with tailwind apply but not inline which is :(  -->
<!-- Hover doesn't work but like text styles do? -->
<!-- Something to do with pointer events? -->

{#if headings.length !== 0}
  <div class="flex flex-col space-y-2">
    <div class="flex items-center space-x-2">
      <button on:click={toggleButton}>
        {#if isOpen}
          <ArrowTl size={iconSize} {strokeWidth} />
        {:else}
          <ArrowTr size={iconSize} {strokeWidth} />
        {/if}
      </button>
      <span class="text-lg font-semibold">Table of Contents</span>
    </div>
    {#if isOpen}
      <div transition:slide={{ duration: 300 }}>
        <ul>
          {#each headings as heading}
            <!-- TODO: couldn't get tailwind to work so had to do it by hand...  -->
            <!-- TODO: there's some random white line on the page that I'll have to fix later -->
            <li style="padding-left: {heading.depth * 0.75}rem;">
              <a
                href="#{heading.slug}"
                style="color: black; text-decoration: none;"
                on:mouseover={() => (event.target.style.color = "blue")}
                on:mouseout={() => (event.target.style.color = "black")}
                >{heading.text}</a
              >
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
