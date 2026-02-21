<script lang="ts">
  import MainCard from "./components/MainCard.svelte";
  import NamedCard from "./components/NamedCard.svelte";
  import Popup from "./components/Popup.svelte";

  let levels: any[] = [];
  let namedLevels: any[] = [];

  let showPopup: boolean = false;
  let mainCardRef: any;

  let ldm = false;
  let manualLdm = false;

  function handleRestart() {
    if (mainCardRef && mainCardRef.restartGame) mainCardRef.restartGame();
    showPopup = false;
  }

  function handleCancel() {
    showPopup = false;
  }

  let last = performance.now();
  let frameCount = 0;

  function monitorFPS(now: number) {
    frameCount++;
    const delta = now - last;
    if (delta >= 1000) {
      const fps = (frameCount / delta) * 1000;
      if (!manualLdm) {
        ldm = fps < 30;
        if (ldm) console.warn("Page is laggy! FPS:", Math.round(fps));
      }
      frameCount = 0;
      last = now;
    }
    requestAnimationFrame(monitorFPS);
  }

  requestAnimationFrame(monitorFPS);

  function toggleLDM() {
    manualLdm = !manualLdm;
    ldm = manualLdm;
  }
</script>

<div class="min-h-screen flex bg-zinc-900">
  <div class="w-85">
    <NamedCard {levels} bind:namedLevels {ldm} />
  </div>

  <div class="flex-1">
    <MainCard
      bind:this={mainCardRef}
      bind:levels
      bind:namedLevels
      bind:showPopup
      {ldm}
    />
  </div>
</div>

{#if showPopup}
  <Popup
    message="Are you sure you want to restart?"
    onConfirm={handleRestart}
    onCancel={handleCancel}
    {ldm}
  />
{/if}

<button
  class="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg bg-emerald-500 text-white font-bold text-sm shadow-lg hover:bg-emerald-200 transition-colors"
  onclick={toggleLDM}
>
  ldm: {ldm ? "ON" : "OFF"}
</button>
