import JSZip from "jszip";

const iconListFile =
  "// You May add this array to your manifest.json icon field\n" +
  JSON.stringify(
    JSON.parse(
      `[{"src":"/img/android-icon-36x36.png","sizes":"36x36","type":"image/png","density":"0.75"},{"src":"/img/android-icon-48x48.png","sizes":"48x48","type":"image/png","density":"1.0"},{"src":"/img/android-icon-72x72.png","sizes":"72x72","type":"image/png","density":"1.5"},{"src":"/img/android-icon-96x96.png","sizes":"96x96","type":"image/png","density":"2.0"},{"src":"/img/android-icon-144x144.png","sizes":"144x144","type":"image/png","density":"3.0"},{"src":"/img/android-icon-192x192.png","sizes":"192x192","type":"image/png","density":"4.0"},{"src":"/img/android-chrome-192x192.png","sizes":"192x192","purpose":"maskable"},{"src":"/img/android-chrome-512x512.png","sizes":"512x512","purpose":"maskable"}]`,
    ),
    null,
    2,
  );

const browserConfigFile = `<?xml version="1.0" encoding="utf-8"?>\n  <browserconfig>\n    <msapplication>\n      <tile>\n        <square70x70logo src="/img/ms-icon-70x70.png"/>\n        <square150x150logo src="/img/ms-icon-150x150.png"/>\n        <square310x310logo src="/img/ms-icon-310x310.png"/>\n        <TileColor>#ffffff</TileColor>\n      </tile>\n    </msapplication>\n  </browserconfig>`;

const iconSizes: [number, string][] = [
  [36, "android-icon-36x36.png"],
  [48, "android-icon-48x48.png"],
  [72, "android-icon-72x72.png"],
  [96, "android-icon-96x96.png"],
  [144, "android-icon-144x144.png"],
  [192, "android-icon-192x192.png"],
  [192, "android-chrome-192x192.png"],
  [512, "android-chrome-512x512.png"],
  [16, "favicon-16x16.png"],
  [32, "favicon-32x32.png"],
  [96, "favicon-96x96.png"],
  [57, "apple-icon-57x57.png"],
  [60, "apple-icon-60x60.png"],
  [72, "apple-icon-72x72.png"],
  [76, "apple-icon-76x76.png"],
  [114, "apple-icon-114x114.png"],
  [120, "apple-icon-120x120.png"],
  [144, "apple-icon-144x144.png"],
  [152, "apple-icon-152x152.png"],
  [180, "apple-icon-180x180.png"],
  [180, "apple-touch-icon.png"],
  [192, "apple-icon.png"],
  [192, "apple-icon-precomposed.png"],
  [70, "ms-icon-70x70.png"],
  [144, "ms-icon-144x144.png"],
  [150, "ms-icon-150x150.png"],
  [310, "ms-icon-310x310.png"],
];

// Heavily Inspired and Copied from https://github.com/johnsorrentino/favicon.js

const resizeCanvas = (canvas: HTMLCanvasElement, height: number, width: number) => {
  //Internal Resize Method
  const resize = (originalCanvas: HTMLCanvasElement, width: number, height: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to Get Canvas Context");
    ctx.drawImage(originalCanvas, 0, 0, width, height);
    return canvas;
  };

  // Create new Canvas to prevent original quality loss
  let newCanvas = resize(canvas, canvas.width, canvas.height);

  // Resize by half each time to maintain image quality
  while (newCanvas.width / 2 >= width) {
    newCanvas = resize(newCanvas, newCanvas.width / 2, newCanvas.height / 2);
  }

  if (newCanvas.width > width) {
    newCanvas = resize(newCanvas, width, height);
  }
  return newCanvas;
};

const createIcoImage = (canvas: HTMLCanvasElement, sizes: number[]) => {
  const arrayBufferToBinary = (buffer: ArrayBuffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  };

  const Uint8ArrayToBinary = (Uint8Array: Uint8Array) => {
    let binary = "";
    const bytes = Uint8Array;
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  };

  const createIconDirectoryHeader = (numImages: number) => {
    const buffer = new ArrayBuffer(6);
    const view = new DataView(buffer);
    view.setUint16(0, 0, true); // Reserved. Must always be 0.
    view.setUint16(2, 1, true); // Specifies type. 1 = ICO.
    view.setUint16(4, numImages, true); // Number of images.
    return arrayBufferToBinary(buffer);
  };

  const calculateBitmapOffset = (sizes: number[], entry: number) => {
    let offset = 6; // icon header size
    offset += 16 * sizes.length; // icon entry header size

    // size of previous bitmaps
    for (let i = 0; i < entry; i++) {
      const size = sizes[i];
      offset += 40; // bitmap header size
      offset += 4 * size * size; // bitmap data size
      offset += (2 * size * size) / 8; // bitmap mask size
    }
    return offset;
  };
  const canvasToBitmap = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to Get Canvas Context");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const rgbaData8 = imageData.data;
    const rgbData8Reverse = new Uint8ClampedArray(imageData.data.length);
    for (let i = 0; i < rgbaData8.length; i += 4) {
      const r = rgbaData8[i];
      const g = rgbaData8[i + 1];
      const b = rgbaData8[i + 2];
      const a = rgbaData8[i + 3];
      rgbData8Reverse[i] = b;
      rgbData8Reverse[i + 1] = g;
      rgbData8Reverse[i + 2] = r;
      rgbData8Reverse[i + 3] = a;
    }

    const rgbData32Reverse = new Uint32Array(rgbData8Reverse.buffer);
    const rgbData32 = new Uint32Array(rgbData32Reverse.length);
    for (let i = 0; i < rgbData32Reverse.length; i++) {
      const xPos = i % canvas.width;
      const yPos = Math.floor(i / canvas.width);
      const xPosRotated = xPos;
      const yPosRotated = canvas.height - 1 - yPos;
      const indexRotated = yPosRotated * canvas.width + xPosRotated;
      const pixel = rgbData32Reverse[i];
      rgbData32[indexRotated] = pixel;
    }
    return rgbData32.buffer;
  };

  const createBitmapImageData = (canvas: HTMLCanvasElement) => {
    const bitmapMask = new Uint8Array((canvas.width * canvas.height * 2) / 8);
    bitmapMask.fill(0);
    let binary = arrayBufferToBinary(canvasToBitmap(canvas));
    binary += Uint8ArrayToBinary(bitmapMask);
    return binary;
  };

  const createIconDirectoryEntry = (
    width: number,
    height: number,
    size: number,
    offset: number,
  ) => {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    view.setUint8(0, width); // Pixel width (0..256). 0 = 256 pixels.
    view.setUint8(1, height); // Pixel height (0..256). 0 = 256 pixels.
    view.setUint8(2, 0); // Number of colors in pallet. 0 = no pallet.
    view.setUint8(3, 0); // Reserved. Should be 0.
    view.setUint16(4, 1, true); // Color planes. 0 or 1.
    view.setUint16(6, 32, true); // Specifies bits per pixel.
    view.setUint32(8, size, true); // Image size (bytes).
    view.setUint32(12, offset, true); // Offset to BMP of PNG.
    return arrayBufferToBinary(buffer);
  };

  const createBitmapInfoHeader = (width: number, height: number) => {
    const buffer = new ArrayBuffer(40);
    const view = new DataView(buffer);
    view.setUint32(0, 40, true); // Header size (40 bytes).
    view.setInt32(4, width, true); // BMP width.
    view.setInt32(8, 2 * height, true); // BMP height.
    view.setUint16(12, 1, true); // Number of color planes. Must be 1.
    view.setUint16(14, 32, true); // Bits per pixel
    view.setUint32(16, 0, true); // Compression method. 0 = none.
    view.setUint32(20, 0, true); // Image size (bytes). 0 = no compression.
    view.setUint32(24, 0, true); // Horizontal resolution.
    view.setUint32(28, 0, true); // Vertical resolution.
    view.setUint32(32, 0, true); // Number of colors. 0 = default.
    view.setUint32(36, 0, true); // Number of important colors. 0 =  all
    return arrayBufferToBinary(buffer);
  };

  const masterCanvas = resizeCanvas(canvas, 128, 128);
  const iconDirectoryHeader = createIconDirectoryHeader(sizes.length);
  let iconDirectoryEntries = "";
  let bitmapData = "";

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const canvas = resizeCanvas(masterCanvas, size, size);
    const width = canvas.width;
    const height = canvas.height;
    const bitmapInfoHeader = createBitmapInfoHeader(width, height);
    const bitmapImageData = createBitmapImageData(canvas);
    const bitmapSize = bitmapInfoHeader.length + bitmapImageData.length;
    const bitmapOffset = calculateBitmapOffset(sizes, i);
    iconDirectoryEntries += createIconDirectoryEntry(width, height, bitmapSize, bitmapOffset);
    bitmapData += bitmapInfoHeader + bitmapImageData;
  }

  const binary = iconDirectoryHeader + iconDirectoryEntries + bitmapData;
  return window.btoa(binary);
};

const createFaviconBundle = async (canvas: HTMLCanvasElement) => {
  const zip = new JSZip();
  zip.file("icon-list.jsonc", iconListFile);
  zip.file("browserconfig.xml", browserConfigFile);

  const imgFolder = zip.folder("img");
  if (!imgFolder) throw new Error("Failed to Create a Folder in zip");

  const icoImage = createIcoImage(canvas, [16, 32, 48, 96, 128]);
  imgFolder.file("favicon.ico", icoImage, { base64: true });

  iconSizes.forEach(([size, fileName]) => {
    const file = resizeCanvas(canvas, size, size).toDataURL();
    imgFolder.file(fileName, file.substring(file.indexOf("base64,") + 7), { base64: true });
  });

  return await zip.generateAsync({ type: "base64" });
};

export default createFaviconBundle;
