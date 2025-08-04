<script lang="ts">
  import {
    getNearestColor,
    hex2color,
    rgb2color,
    type Color,
  } from "$lib/colors";

  let color = $state("");

  let nearestColor = $state<Color>();

  $effect(() => {
    if (color.startsWith("rgb")) {
      const rgb = rgb2color(color);

      if (rgb !== null) {
        nearestColor = getNearestColor(rgb);
        return;
      }
    }

    if (color.startsWith("#")) {
      const rgb = hex2color(color);

      if (rgb !== null) {
        nearestColor = getNearestColor(rgb);
        return;
      }
    }

    nearestColor = undefined;
  });
</script>

<div class="size-full flex items-center justify-center">
  <main
    class="rounded-2xl bg-amber-50 p-5 border-amber-400 border-2 w-96 flex flex-col gap-3"
  >
    <p class="text-gray-600">only HEX & RGB supported</p>
    <p>Color</p>
    <input type="text" bind:value={color} class="border p-2 rounded-xs" />

    <div class="flex">
      <div class="flex flex-1 gap-3 flex-col items-center">
        <p class="text-center">
          Your color: {color}
        </p>
        <div class="size-12 border" style="background-color: {color};"></div>
      </div>
      <div class="flex flex-1 gap-3 flex-col items-center justify-center">
        {#if nearestColor}
          <p class="text-center">
            Nearest color for {color}
          </p>
          <div
            class="size-12 border"
            style="background-color: rgb({nearestColor.rgb.join(',')});"
          ></div>
          <p>{nearestColor.title}</p>
        {:else}
          waiting for a color..
        {/if}
      </div>
    </div>
  </main>
</div>
