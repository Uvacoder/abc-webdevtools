<script lang="ts">
  export let title: string;
  export let ogTitle = title;
  export let description: string;
  export let ogDescription = description;
  export let robots = "follow, index";
  export let url: string;
  export let imageUrl = "/banner.png";
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link rel="apple-touch-icon" sizes="57x57" href="/img/apple-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="/img/apple-icon-60x60.png" />
<link rel="apple-touch-icon" sizes="72x72" href="/img/apple-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="/img/apple-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="/img/apple-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="/img/apple-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="/img/apple-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/img/apple-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/img/apple-icon-180x180.png" />
<link rel="icon" type="image/svg+xml" sizes="1024x1024" href="/img/logo.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/img/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/img/android-icon-192x192.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/img/android-chrome-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/img/android-chrome-512x512.png" />
<link rel="manifest" href="/manifest.json" />
<meta name="msapplication-TileColor" content="##ffb300" />
<meta name="msapplication-TileImage" content="/img/ms-icon-144x144.png" />
<meta name="theme-color" content="#ffb300" />
<title>{title}</title>
<meta name="robots" content={robots} />
<meta name="description" content={description} />
<meta property="og:title" content={ogTitle} />
<meta property="og:site_name" content="Web Dev Tools" />
<meta property="og:url" content={url} />
<meta property="og:description" content={ogDescription} />
<meta property="og:type" content="website" />
<meta property="og:image" content={imageUrl} />
