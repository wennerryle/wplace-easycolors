<script lang="ts">
  interface Props {
    files?: FileList | null;
    accept?: string;
  }

  let { files = $bindable(), accept = "" }: Props = $props();

  function getFileList() {
    const { promise, resolve } = Promise.withResolvers<FileList | null>();

    const input = document.createElement("input");
    input.type = "file";

    if (accept) {
      input.accept = accept;
    }

    input.onchange = () => {
      resolve(input.files?.length ? input.files : null);
    };

    input.addEventListener("cancel", () => resolve(null), { once: true });

    input.click();

    return promise;
  }

  let isDraggingFile = $state(false);

  function setDraggingFalse() {
    isDraggingFile = false;
  }

  function handleFileInput(event: DragEvent) {
    if (event.dataTransfer?.files.length) {
      files = event.dataTransfer.files;
    }
  }

  function stopBubbling<const T extends Event>(event: T) {
    event.stopPropagation();
    event.preventDefault();
  }

  async function handleButtonClick() {
    files = await getFileList();
  }
</script>

<span class="text-xs tracking-normal">Choose file</span>
<button
  onclick={handleButtonClick}
  ondrag={stopBubbling}
  ondragstart={stopBubbling}
  ondragend={(event) => {
    stopBubbling(event);
    setDraggingFalse();
  }}
  ondragover={(event) => {
    stopBubbling(event);
    isDraggingFile = true;
  }}
  ondragenter={stopBubbling}
  ondragleave={(event) => {
    stopBubbling(event);
    setDraggingFalse();
  }}
  ondrop={(event) => {
    stopBubbling(event);
    handleFileInput(event as DragEvent);
    setDraggingFalse();
  }}
  class:bg-green-100={isDraggingFile}
  class="cursor-pointer flex h-20 w-full flex-col items-center justify-center
    rounded-lg border-2 border-dashed border-gray-300"
>
  <svg
    class="mb-2 size-6"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="#000000"
    height="800px"
    width="800px"
    version="1.1"
    id="Capa_1"
    viewBox="0 0 31.004 31.004"
    xml:space="preserve"
  >
    <g>
      <path
        d="M22.4,31.004V26.49c0-0.936,0.757-1.697,1.696-1.697l3.498-0.1L22.4,31.004z"
      />
      <path
        d="M25.899,0H5.108C4.17,0,3.411,0.762,3.411,1.697v27.611c0,0.939,0.759,1.695,1.697,1.695H20.71v-6.02   c0-0.936,0.762-1.697,1.699-1.697h5.184V1.697C27.594,0.762,26.835,0,25.899,0z M12.068,20.783v6.898H7.741V20.9H5.632l4.219-4.789   l4.328,4.672H12.068z"
      />
    </g>
  </svg>
  <span
    class="border-b border-amber-200 text-[14px] text-amber-500 hover:border-amber-500"
    >Choose file</span
  >
</button>
