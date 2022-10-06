<script lang="ts">
  import SeoTags from "@components/SeoTags.svelte";
</script>

<section>
  <h1>Web Dev Tools</h1>
  <hr />
  <div>
    <a href="/favicon">Favicon Generator</a>
  </div>
  <hr />
  <span>More Epic Shit Coming Soon</span>
  <a href="https://github.com/YetAnotherDeveloperYT/Web-Dev-Tools">Contribute on github</a>
</section>

<svelte:head>
  <SeoTags
    title="Web Dev Tools"
    description="A Set Of Tools For Web Developers"
    url="https://web-dev-tools.vercel.app/"
  />
</svelte:head>

<style lang="scss">
  section {
    width: min(440px, 90vw);
    margin: 0 auto;
    overflow: hidden;
    h1 {
      text-align: center;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }

  a {
    color: var(--primary-color);
    padding: 0.5rem 0.75rem;
    border: 2px solid transparent;
    border-radius: 1rem;
    transition: all 200ms ease-in-out;
    margin: 0.5rem auto;
    text-align: center;
    display: block;
    &:hover {
      border: 2px solid var(--primary-color);
    }
  }
  span {
    color: var(--primary-color);
    text-align: center;
    margin: 1rem auto;
    display: block;
    font-weight: 700;
    font-size: 1.5rem;
  }
</style>
