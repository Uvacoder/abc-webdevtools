<script lang="ts">
  import SeoTags from "@components/SeoTags.svelte";
  import "../app.scss";
</script>

<main>
  <slot />
</main>

<svelte:head>
  <SeoTags />
</svelte:head>

<style>
  main {
    height: 100%;
  }
</style>
