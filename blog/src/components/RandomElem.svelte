<script lang="ts">
  export let titles: string[];
  export let link: string;
  // TODO: store the random elem
  let randomElem = titles[Math.floor(Math.random() * titles.length)];
</script>

<h3 class="header__title">
  <a href="https://milesconn.io">{randomElem}</a>
</h3>

<style>
  .header__title {
    @apply text-1xl font-extrabold md:text-5xl text-theme-secondary;
  }
</style>
