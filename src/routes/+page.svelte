<script lang="ts">
  import { Tabs } from "bits-ui";

  import NearestColor from "$lib/components/NearestColor.svelte";
  import Image2ColorSpace from "$lib/components/Image2ColorSpace.svelte";
</script>

<div class="size-full flex items-center justify-center p-10">
  <main
    class="rounded-2xl bg-amber-50 p-5 border-amber-400 border-2 w-max flex flex-col gap-3"
  >
    <h1 class="text-center pb-2.5">wplace.live colors utils</h1>
    <Tabs.Root value="Find nearest color">
      <Tabs.List class="flex gap-3 mb-2.5 bg-gray-200 p-2 rounded-xl">
        <Tabs.Trigger
          class="data-[state=active]:bg-white rounded-xl p-2 cursor-pointer flex-1"
          value="Find nearest color"
        >
          Find nearest color
        </Tabs.Trigger>
        <Tabs.Trigger
          value="Convert image colors"
          class="data-[state=active]:bg-white rounded-xl p-2 cursor-pointer flex-1"
        >
          Image to wplace.live color space
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="Find nearest color" class="flex flex-col gap-3">
        <NearestColor />
      </Tabs.Content>
      <Tabs.Content value="Convert image colors" class="flex flex-col gap-3">
        <Image2ColorSpace />
      </Tabs.Content>
    </Tabs.Root>
  </main>
</div>
