<script lang="ts">
  import { colors, getNearestColor, type Color } from "$lib/colors";
  import type { MouseEventHandler } from "svelte/elements";
  import DnDFilePicker from "./DnDFilePicker.svelte";

  let files: FileList | null = $state(null);

  let canvas = $state<HTMLCanvasElement>();
  let hoveredColor = $state<Color>();

  $effect(() => {
    if (files === null) return;
    processeImage(files);
  });

  async function processeImage(files: FileList) {
    const file = files.item(0);
    if (file === null) return;

    const ctx = canvas!.getContext("2d", {
      alpha: false,
      willReadFrequently: true,
    })!;

    const image = new Image();

    const { resolve, promise } = Promise.withResolvers();

    image.addEventListener("load", resolve);

    image.src = URL.createObjectURL(file);

    await promise;

    canvas!.width = image.naturalWidth;
    canvas!.height = image.naturalHeight;

    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas!.width, canvas!.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      const nearestColor = getNearestColor([r, g, b]);

      pixels[i] = nearestColor.rgb[0];
      pixels[i + 1] = nearestColor.rgb[1];
      pixels[i + 2] = nearestColor.rgb[2];
    }

    ctx.putImageData(imageData, 0, 0);
  }

  const onmousemove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const bounding = canvas!.getBoundingClientRect();

    const scaleFactorWidth = canvas!.clientWidth / canvas!.width;
    const scaleFactorHeight = canvas!.clientHeight / canvas!.height;

    const x = ((e.clientX - bounding.left) / scaleFactorWidth) >> 0;
    const y = ((e.clientY - bounding.top) / scaleFactorHeight) >> 0;

    const ctx = canvas!.getContext("2d")!;
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    hoveredColor = colors.find(
      (it) =>
        it.rgb[0] === data[0] && it.rgb[1] === data[1] && it.rgb[2] === data[2]
    );
  };

  function ondownloadclick() {
    const link = document.createElement("a");
    link.download = "filename.png";
    link.href = canvas!.toDataURL();
    link.click();
  }
</script>

<p>Select image, and then it's color space will converted into wplace.live</p>

<hr />

<DnDFilePicker accept="image/*" bind:files />

<hr />

{#if hoveredColor}
  <p class="text-center">
    {hoveredColor.title}
  </p>
  <div
    class="size-12 border"
    style="background-color: rgb({hoveredColor.rgb.join(',')});"
  ></div>
{/if}

<canvas
  bind:this={canvas}
  class="w-full h-max"
  style="image-rendering: pixelated;"
  {onmousemove}
></canvas>

<button
  class="p-2 w-full bg-amber-200 rounded-xl cursor-pointer"
  onclick={ondownloadclick}
>
  Download
</button>
