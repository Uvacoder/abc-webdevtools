<script lang="ts">
  import Button from "@components/Button.svelte";
  import OfflineImage from "./offline.svg";
</script>

<section>
  <h1>You Are Offline</h1>
  <img src={OfflineImage} alt="You are Offline" />
  <Button
    on:click={() => {
      window.location.reload();
    }}>Try Reloading</Button
  >
</section>

<svelte:head>
  <title>You Are Offline</title>
</svelte:head>

<style lang="scss">
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: min(440px, 95vw);
    margin: 0 auto;
  }
  h1 {
    font-size: 2rem;
    margin: 2rem auto;
    color: var(--primary-color);
  }
  img {
    width: 100%;
    display: block;
    margin: 1rem auto;
    margin-bottom: 3rem;
  }
</style>
