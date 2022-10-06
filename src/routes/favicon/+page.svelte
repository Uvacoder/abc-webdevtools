<script lang="ts">
  import Button from "@components/Button.svelte";
  import ImageUploader from "@components/ImageUploader.svelte";
  import SeoTags from "@components/SeoTags.svelte";
  import createFaviconBundle from "@lib/createFaviconBundle";
  import fileSaver from "@lib/fileSaver";

  type File = { name: string; fileContent: string } | null;

  let uploadedFile: File = null;
  let errorMessage = "";
  let image: HTMLImageElement;

  const handleFileUpload = (file: File) => {
    if (!file) return;
    uploadedFile = file;
    image = new Image();
    image.src = file.fileContent;
    image.addEventListener(
      "load",
      () => {
        if (image.height < 512 || image.width < 512) {
          errorMessage = "The Recommended Size of Image is at least 512x512px";
        } else if (image.height !== image.width) {
          errorMessage = "The Image is Not Symmetrical [It May be stretched/squeezed]";
        } else {
          errorMessage = "";
        }
      },
      { once: true },
    );
  };

  const createFavicon = async () => {
    const canvas = document.createElement("canvas");
    canvas.height = image.height;
    canvas.width = image.width;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get Canvas Context");
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const zip = await createFaviconBundle(canvas);
    fileSaver(`data:text/binary;base64,${zip}`, `${uploadedFile?.name || "favicon"}.zip`);
  };
</script>

<section>
  <h1>Favicon Generator</h1>
  <div class="container">
    <ImageUploader on:upload={(e) => handleFileUpload(e.detail)} />
    <span class="error-msg">{errorMessage}</span>
    <div class="control">
      {#if !!uploadedFile}
        <Button on:click={() => createFavicon()}>Generate Favicon Bundle</Button>
      {/if}
    </div>
  </div>
</section>

<svelte:head>
  <SeoTags
    title="Favicon Generator - Web Dev Tools"
    description="Generate a Bundle Of Favicon from any image"
    url="https://web-dev-tools.vercel.app/favicon"
  />
</svelte:head>

<style lang="scss">
  section {
    padding: 1rem 0;
  }
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
  .error-msg {
    display: block;
    text-align: center;
    margin: 0 auto;
    color: var(--error-color);
    font-weight: 600;
  }
</style>
