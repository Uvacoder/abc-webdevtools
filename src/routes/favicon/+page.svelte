<script lang="ts">
  import ImageUploader from "@components/ImageUploader.svelte";
</script>

<section>
  <h1>Favicon Generator</h1>
  <div class="container">
    <ImageUploader on:imageUpload={(e) => console.log(e.detail)} />
  </div>
</section>

<style lang="scss">
  h1 {
    text-align: center;
    font-size: 2rem;
    color: var(--primary-color);
    padding: 1rem;
  }
</style>
