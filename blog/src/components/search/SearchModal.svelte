<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { isSearchVisible } from "../../store/search";
  import Search from "./Search.svelte";

  const dismissModal = () => isSearchVisible.set(false);
  const handleEsc = (event) => {
    if (event.key === "Escape") {
      dismissModal();
    }
  };
</script>

{#if $isSearchVisible}
  <div
    class="modal__backdrop"
    on:click={dismissModal}
    on:keydown={handleEsc}
    transition:fade
  />
  <div class="modal">
    <div class="modal__cnt" transition:fly={{ y: 200, duration: 300 }}>
      <Search />
    </div>
  </div>
{/if}

<style>
  .modal {
    @apply absolute top-0 left-0 w-full h-full grid justify-center content-center pointer-events-none;
  }
  .modal__backdrop {
    @apply absolute top-0 left-0 w-full h-screen opacity-50 bg-[linear-gradient(to_right_bottom,rgba(49,84,44,0.8),rgba(16,71,52,0.8)),url('/assets/noise.svg')]
    /* bg-[url('/icons/noise.svg')]; */;
  }
  .modal__cnt {
    @apply w-full z-10 pointer-events-auto;
  }
</style>
