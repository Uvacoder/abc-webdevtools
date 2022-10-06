<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const eventDispatcher = createEventDispatcher();

  let dragging = false;
  let error = false;
  let status = "";
  let imgSrc: string | null = null;
  let fileInput: HTMLInputElement;

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length < 1) {
      error = true;
      status = "No File Received in Input [Original FIle was Kept]";
      return;
    }
    const file = files.item(0);
    if (!file || !file.type.startsWith("image/")) {
      error = true;
      imgSrc = null;
      status = "Your Provided File is not a Valid Image File";
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const fileContent = e.target?.result as string;
      imgSrc = fileContent;
      eventDispatcher("imageUpload", {
        name: file.name,
        size: file.size,
        type: file.type,
        fileContent,
      });
      error = false;
      status = `${file.name} [${(file.size / 1024).toFixed(2)}kb]`;
    };
    fileReader.readAsDataURL(file);
  };
</script>

<div class="wrapper">
  <span class="title">Upload an Image</span>
  <div
    class="upload-area"
    class:dragging
    class:error
    on:dragover|preventDefault={() => {}}
    on:dragenter|preventDefault={() => {
      dragging = true;
    }}
    on:dragleave|preventDefault={() => {
      dragging = false;
    }}
    on:dragexit|preventDefault={() => {
      dragging = false;
    }}
    on:drop|preventDefault={(e) => {
      if (e.dataTransfer?.files) {
        handleFileUpload(e.dataTransfer.files);
      }
      dragging = false;
    }}
    on:click={() => {
      fileInput.click();
    }}
  >
    <input
      type="file"
      accept="image/*"
      on:change={(e) => handleFileUpload(e.currentTarget.files)}
      hidden
      bind:this={fileInput}
    />
    <div class="preview-box">
      <img class="preview" alt="Uploaded" src={imgSrc} hidden={!imgSrc} />
    </div>
    <div class="logo" hidden={!!imgSrc}>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M125 58.3333L100 33.3333M100 33.3333L75 58.3333M100 33.3333V133.333M56.25 83.3333H50C36.1929 83.3333 25 94.5262 25 108.333V126.667C25 140.668 25 147.669 27.7248 153.016C30.1217 157.721 33.9462 161.545 38.6502 163.942C43.998 166.667 50.9987 166.667 65 166.667H135C149.001 166.667 156.002 166.667 161.35 163.942C166.054 161.545 169.878 157.721 172.275 153.016C175 147.669 175 140.668 175 126.667V108.333C175 94.5262 163.807 83.3333 150 83.3333H143.75"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="text">
      <span class="info"> Drag and Drop or Select a File </span>
      <span class="msg" class:error>
        {status}
      </span>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    width: min(560px, 95vw);
    margin: 0 auto;
    .title {
      display: block;
      margin: 0 auto;
      padding: 0.5rem;
      text-align: center;
      font-weight: 600;
      color: var(--primary-color);
      font-size: 1.25rem;
    }
    .upload-area {
      min-height: min(300px, 30vh);
      border-radius: 0.5rem;
      border: 2px dashed var(--primary-color-shade);
      margin: 0.75rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      box-shadow: hsla(0, 0%, 0%, 0.24) 0px 3px 8px;
      transition: all 300ms cubic-bezier(0.49, -0.05, 0.43, 1.1);
      padding: 1rem;

      &:hover,
      &.dragging {
        background: var(--gray-1);
        cursor: pointer;
        .logo svg {
          transform: translateY(-20px);
        }
      }
      &.error {
        border: 2px dashed var(--error-color-shade);
      }
      .preview-box {
        max-width: 90%;
        pointer-events: none;
      }
      .preview {
        width: 100%;
        pointer-events: none;
      }
      .logo {
        opacity: 0.3;
        pointer-events: none;
        width: 50%;
        svg {
          transition: all 200ms ease-in-out;
          height: inherit;
          width: inherit;
          stroke: var(--auto-text);
          display: block;
          margin: 0 auto;
        }
      }
      .text {
        color: var(--auto-text);
        pointer-events: none;
        text-align: center;
        span {
          display: block;
          margin: 0.5rem 0;
          &.info {
            color: var(--primary-color);
          }
          &.msg {
            color: var(--auto-text);
          }
          &.error {
            color: var(--error-color);
          }
        }
      }
    }
  }
</style>
