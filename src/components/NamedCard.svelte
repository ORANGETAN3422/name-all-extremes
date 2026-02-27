<script lang="ts">
    export let levels: any[] = [];
    export let namedLevels: any[] = [];
    export let ldm = false;

    $: namedSet = new Set(namedLevels.map((l) => l.name));

    let showNamedOnly = false;

    $: displayedLevels = showNamedOnly
        ? levels.filter((level) => namedSet.has(level.name))
        : levels;
</script>

<div class="min-h-screen max-h-screen w-85 flex">
    <div class="flex-1 min-h-screen rounded-2xl p-0.5" class:radial-bg={!ldm}>
        <div
            class="w-full h-full rounded-2xl p-6 pt-10 flex flex-col text-left relative overflow-hidden shadow-2xl"
            class:bg-layer={!ldm}
        >
            <button
                class="glass-btn mb-4 self-start"
                on:click={() => (showNamedOnly = !showNamedOnly)}
            >
                {showNamedOnly ? "Show All" : "Show Named"}
            </button>

            <div class="relative z-10 overflow-y-auto h-full pr-2">
                {#each displayedLevels as level (level.name)}
                    <div
                        class="level-card"
                        class:named={namedSet.has(level.name)}
                        class:ldm
                    >
                        <p>
                            #{level.position}
                            <span class="pl-2">
                                {namedSet.has(level.name) ? level.name : "???"}
                            </span>
                        </p>
                    </div>
                {/each}
            </div>

            <div
                class="absolute inset-0 rounded-2xl pointer-events-none blur-[2px] z-20"
                class:linear-bg={!ldm}
            ></div>
        </div>
    </div>
</div>

<style>
    .radial-bg {
        background: radial-gradient(
            ellipse at top,
            rgba(30, 30, 30, 0.6) 0%,
            rgba(25, 25, 25, 0.55) 40%,
            rgba(20, 20, 20, 0.5) 70%,
            rgba(15, 15, 15, 0.8) 100%
        );
    }

    .linear-bg {
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(150, 255, 255, 0.05)
        );
    }

    .bg-layer {
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(8px);
    }

    .level-card {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.5rem 0.75rem;
        margin-bottom: 0.5rem;
        border-radius: 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(8px);
        transition: all 0.3s ease;
        border: none;
        overflow: hidden;
        z-index: 0;
    }

    .level-card::before {
        content: "";
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: inherit;
        background: linear-gradient(
            -135deg,
            rgba(255, 255, 255, 0.103),
            rgba(255, 255, 255, 0.05)
        );
        filter: blur(4px);
        z-index: -1;
    }

    .level-card.named {
        background-color: rgba(16, 185, 129, 0.2);
    }

    .level-card.named::before {
        background: linear-gradient(
            135deg,
            rgba(16, 185, 129, 0.3),
            rgba(16, 185, 129, 0.05)
        );
    }

    .level-card:hover {
        transform: translateY(-1px);
    }

    .level-card.ldm {
        backdrop-filter: none;
        background-color: #222;
        color: #fff;
    }

    .level-card.ldm::before {
        background: none;
        filter: none;
    }

    .level-card.ldm:hover {
        transform: none;
    }

    .level-card.named.ldm {
        background-color: rgb(0, 75, 25);
    }

    .glass-btn {
        padding: 0.5rem 1rem;
        border-radius: 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(8px);
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .glass-btn::before {
        content: "";
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: inherit;
        background: linear-gradient(
            -135deg,
            rgba(255, 255, 255, 0.103),
            rgba(255, 255, 255, 0.05)
        );
        filter: blur(4px);
        z-index: -1;
    }

    .glass-btn:hover {
        transform: translateY(-1px);
    }

    .glass-btn:active {
        transform: translateY(0);
    }
</style>
