<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let href: string | null = null;
  export let as: "a" | "button" = "button";
  const eventDispatcher = createEventDispatcher();
</script>

<svelte:element
  this={as}
  class="btn"
  {href}
  on:click={() => {
    eventDispatcher("click");
  }}
>
  <slot />
</svelte:element>

<style lang="scss">
  .btn {
    display: flex;
    align-self: center;
    justify-content: center;
    background: var(--primary-color);
    border-radius: 50px;
    font-size: 1.2rem;
    padding: 0.65rem 0.75rem;
    font-weight: 600;
    outline: none;
    border: none;
    color: black;
    width: inherit;
    cursor: pointer;
  }
</style>
