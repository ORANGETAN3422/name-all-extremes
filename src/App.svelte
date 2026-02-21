<script lang="ts">
  import StartCard from "./components/StartCard.svelte";
  import NamedCard from "./components/NamedCard.svelte";

  import { fetchLevels } from "./lib/api";

  let levels: any[] = [];
  let namedLevels: any[] = [];

  fetchLevels().then((l) => {
    levels = l;
    console.log(levels);
  });
</script>

<div class="min-h-screen flex bg-zinc-900">
  <div class="w-85">
    <NamedCard {levels} bind:namedLevels />
  </div>

  <div class="flex-1">
    <StartCard {levels} bind:namedLevels />
  </div>
</div>
