<script lang="ts">
  export let show = false;
</script>

<div class="modal-container" class:show>
  <div class="modal">
    <div class="head">
      <button on:click={() => (show = false)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  .modal-container {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: hsla(0, 0%, 25%, 0.637);
    &.show {
      display: flex;
    }
    .modal {
      min-height: min(300px, 75vh);
      min-width: min(400px, 80vw);
      margin: 0 auto;
      border: 2px solid var(--primary-color);
      border-radius: 1rem;
      padding: 0.5rem;
      background: var(--auto-bg);
      .head {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
          background: transparent;
          outline: none;
          border: none;
          color: var(--primary-color);
          cursor: pointer;
        }
      }
      .body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
