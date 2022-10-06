<script lang="ts">
  import Button from "@components/Button.svelte";
  import ImageUploader from "@components/ImageUploader.svelte";
  import createFaviconBundle from "@lib/createFaviconBundle";

  let file: { name: string; fileContent: string } | null = null;

  const createFavicon = () => {
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get Canvas Context");
    const image = new Image();
    image.src = file.fileContent;
    image.onload = async () => {
      canvas.height = image.height;
      canvas.width = image.width;
      if (image.height !== image.width) {
        console.log("Picture is not Symmetrical");
      }
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const zip = await createFaviconBundle(canvas);
      const el = document.createElement("a");
      el.href = `data:text/binary;base64,${zip}`;
      el.download = `${file?.name}.zip`;
      el.click();
      el.remove();
    };
  };
</script>

<section>
  <h1>Favicon Generator</h1>
  <div class="container">
    <ImageUploader on:imageUpload={(e) => (file = e.detail)} />
    <div class="control">
      {#if !!file}
        <Button on:click={createFavicon}>Generate Favicon Bundle</Button>
      {/if}
    </div>
  </div>
</section>

<style lang="scss">
  h1 {
    text-align: center;
    font-size: 2rem;
    color: var(--primary-color);
    padding: 1rem;
  }
  .control {
    width: min(350px, 90vw);
    margin: 1.5rem auto;
  }
</style>
