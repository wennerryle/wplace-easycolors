<script lang="ts">
  import {
    getNearestColor,
    hex2color,
    rgb2color,
    type Color,
    type RGBArray,
  } from "$lib/colors";

  let rgbColor = $state<RGBArray>([0, 0, 0]);
  let bindableColor = $state("");

  let nearestColor = $state<Color>();

  $effect(() => {
    if (bindableColor.startsWith("rgb")) {
      const rgb = rgb2color(bindableColor);

      if (rgb !== null) {
        rgbColor = rgb;
        nearestColor = getNearestColor(rgb);
        return;
      }
    }

    if (bindableColor.startsWith("#")) {
      const rgb = hex2color(bindableColor);

      if (rgb !== null) {
        rgbColor = rgb;
        nearestColor = getNearestColor(rgb);
        return;
      }
    }

    if (bindableColor.split(",").length === 3) {
      const rgb = bindableColor
        .split(",")
        .map((it) => Number(it.trim()))
        .filter((it) => !Number.isNaN(it));

      if (rgb.length === 3) {
        rgbColor = rgb as RGBArray;
        nearestColor = getNearestColor(rgb as RGBArray);
        return;
      }
    }

    nearestColor = undefined;
  });
</script>

<p class="text-gray-600">only HEX & RGB supported</p>
<p>Color</p>
<input type="text" bind:value={bindableColor} class="border p-2 rounded-xs" />
<hr />

<p>Browser colorpicker</p>
<input
  type="color"
  bind:value={bindableColor}
  class="size-10 rounded-xs w-full cursor-pointer"
/>

<hr />

<div class="flex">
  <div class="flex flex-1 gap-3 flex-col items-center">
    <p class="text-center">
      Your color: {bindableColor}
    </p>
    <div
      class="size-12 border"
      style="background-color: rgb({rgbColor.join(',')});"
    ></div>
  </div>
  <div class="flex flex-1 gap-3 flex-col items-center justify-center">
    {#if nearestColor}
      <p class="text-center">
        {nearestColor.title}
      </p>
      <div
        class="size-12 border"
        style="background-color: rgb({nearestColor.rgb.join(',')});"
      ></div>
    {:else}
      waiting for a color..
    {/if}
  </div>
</div>
