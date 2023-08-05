<script lang="ts">
  import ArrowTl from "../Icons/ArrowTl.svelte";
  import ArrowTr from "../Icons/ArrowTr.svelte";

  let isOpen = true;

  const iconSize = "32px";

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

{#if headings.length !== 0}
  <div class="flex flex-col space-y-2">
    <div class="flex items-center space-x-2">
      <button on:click={toggleButton} class="bull_shit">
        {#if isOpen}
          <ArrowTl size={"32px"} />
        {:else}
          <ArrowTr size={"32px"} />
        {/if}
      </button>
      <span class="text-lg font-semibold">Table of Contents</span>
    </div>
    <div
      style="height: {isOpen
        ? 'auto'
        : '0'}; overflow: hidden; transition: height 0.3s ease-in-out;"
    >
      <ul>
        {#each headings as heading}
          <li class="pl-{heading.depth * 2}">
            <a
              href="#{heading.slug}"
              class="transition-all duration-200 hover:text-blue-500"
              >{heading.text}</a
            >
            {#if heading.depth === 1}
              <hr />
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<!-- <style>
  .bull_shit {
    @apply hover:bg-slate-300;
  }
</style> -->
