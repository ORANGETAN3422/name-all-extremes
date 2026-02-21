<script lang="ts">
  import MainCard from "./components/MainCard.svelte";
  import NamedCard from "./components/NamedCard.svelte";
  import Popup from "./components/Popup.svelte";

  let levels: any[] = [];
  let namedLevels: any[] = [];

  let showPopup: boolean = false;
  let mainCardRef: any;

  function handleRestart() {
    if (mainCardRef && mainCardRef.restartGame) mainCardRef.restartGame();
    showPopup = false;
  }

  function handleCancel() {
    showPopup = false;
  }
</script>

<div class="min-h-screen flex bg-zinc-900">
  <div class="w-85">
    <NamedCard {levels} bind:namedLevels />
  </div>

  <div class="flex-1">
    <MainCard
      bind:this={mainCardRef}
      bind:levels
      bind:namedLevels
      bind:showPopup
    />
  </div>
</div>

{#if showPopup}
  <Popup
    message="Are you sure you want to delete restart?"
    onConfirm={handleRestart}
    onCancel={handleCancel}
  />
{/if}
