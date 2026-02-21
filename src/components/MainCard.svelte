<script lang="ts">
    import { onMount } from "svelte";
    import { fetchLevels } from "../lib/api";

    import Timer from "./Timer.svelte";

    export let levels: any[] = [];
    export let namedLevels: any[] = [];
    export let secondsElapsed: number = 0;

    let extreme = "";
    let error = "";
    let errorFlash = false;
    let successFlash = false;

    function checkLevel() {
        let cleanString = extreme
            .toLowerCase()
            .trim()
            .replace(/\[.*?\]|\(.*?\)/g, "")
            .trim();

        const matchedLevels = levels.filter((l) => {
            let levelName = l.name
                .toLowerCase()
                .replace(/\[.*?\]|\(.*?\)/g, "")
                .trim();
            return levelName === cleanString;
        });

        if (matchedLevels.length === 0) {
            if (
                namedLevels.find((l) => {
                    let levelName = l.name
                        .toLowerCase()
                        .replace(/\[.*?\]|\(.*?\)/g, "")
                        .trim();
                    return levelName === cleanString;
                })
            ) {
                error = "Already named that extreme";
            } else {
                error = "That extreme doesn't exist";
            }
            errorFlash = true;
            return;
        }

        namedLevels = [...namedLevels, ...matchedLevels];
        levels = levels.filter((l) => !matchedLevels.includes(l));
        namedLevels = namedLevels.sort((a, b) => a.position - b.position);

        extreme = "";
        error = "";
        errorFlash = false;
        successFlash = true;
        setTimeout(() => (successFlash = false), 300);

        saveState();
    }

    function handleInput() {
        if (errorFlash) {
            errorFlash = false;
            error = "";
        }
    }

    function saveState() {
        localStorage.setItem("levels", JSON.stringify(levels));
        localStorage.setItem("namedLevels", JSON.stringify(namedLevels));
        localStorage.setItem("timer", JSON.stringify(secondsElapsed));
    }

    function restartGame() {
        localStorage.removeItem("levels");
        localStorage.removeItem("namedLevels");
        localStorage.removeItem("timer");

        levels = [];
        namedLevels = [];
        extreme = "";
        secondsElapsed = 0;
        error = "";
        errorFlash = false;
        successFlash = false;

        fetchLevels().then((l) => {
            levels = l;
            console.log(levels);
        });
    }

    onMount(() => {
        const savedLevels = localStorage.getItem("levels");
        const savedNamedLevels = localStorage.getItem("namedLevels");
        const savedTimer = localStorage.getItem("timer");

        if (savedLevels) levels = JSON.parse(savedLevels);
        if (savedNamedLevels) namedLevels = JSON.parse(savedNamedLevels);
        if (savedTimer) secondsElapsed = JSON.parse(savedTimer);
    });
</script>

<div class="min-h-screen flex bg-zinc-900">
    <div class="flex-1 min-h-screen rounded-2xl p-0.5 radial-bg">
        <div
            class="w-full h-full rounded-2xl
             bg-black/20 backdrop-blur-xl
             border border-transparent
             p-6 pt-10 flex flex-col text-center
             relative overflow-hidden shadow-2xl"
        >
            <div
                class="absolute inset-0 rounded-2xl border-2 border-white/20
                  pointer-events-none
                  linear-bg
                  blur-[2px]"
            ></div>

            <h1
                class="relative text-2xl font-semibold text-white/90 tracking-tight mb-6"
            >
                Name All Extremes
            </h1>

            <label for="extreme" class="relative pb-2 text-white/70"
                >Enter names here</label
            >
            <input
                id="extreme"
                bind:value={extreme}
                type="text"
                placeholder="e.g. Bloodbath"
                oninput={handleInput}
                onkeydown={(e) => e.key === "Enter" && checkLevel()}
                class={`fancy-input ${errorFlash ? "error" : successFlash ? "success" : ""}`}
            />

            {#if error}
                <p class="mt-2 text-sm text-red-500 relative">{error}</p>
            {/if}

            <p class="mt-4 text-xs text-white/50 relative">
                Try and list every extreme you can think of. Good Luck!
            </p>

            <h2
                class={`relative text-2xl font-semibold text-white/90 tracking-tight pt-6 transition duration-300 ${successFlash ? "success" : ""}`}
            >
                {namedLevels.length} / {levels.length} Named
            </h2>

            <Timer bind:secondsElapsed />

            <div class="button-container">
                <button class="fancy-button restart" onclick={restartGame}>
                    Restart
                </button>
            </div>

            <div class="flex-1"></div>
        </div>
    </div>
</div>

<style>
    .radial-bg {
        background: radial-gradient(
            ellipse at top left,
            rgba(30, 30, 30, 0.5),
            rgba(10, 10, 10, 0.8),
            rgba(20, 20, 20, 0.7)
        );
    }
    .linear-bg {
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(150, 255, 255, 0.05)
        );
    }

    .fancy-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        background: rgba(0, 0, 0, 0.2);
        color: rgba(255, 255, 255, 0.9);
        border: 2px solid transparent;
        outline: none;
        transition: all 0.3s ease;

        background-image: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1),
                rgba(255, 255, 255, 0.05)
            ),
            linear-gradient(135deg, #00ffff0e, #00bfff11);
        background-origin: border-box;
        background-clip: padding-box, border-box;
    }

    .fancy-input:focus {
        border-color: #06b6d479;
        box-shadow: 0 0 4px rgba(0, 255, 255, 0.4);
    }

    .fancy-input.error {
        border-color: #ff002b79;
        box-shadow: 0 0 6px rgba(245, 101, 101, 0.6);
    }

    .fancy-input.success {
        border-color: #10b98179;
        box-shadow: 0 0 6px rgba(5, 150, 105, 0.6);
    }

    h2.success {
        color: #10b981;
    }

    .button-container {
        display: flex;
        justify-content: center; /* centers horizontally */
        margin-top: 1rem;
    }

    .button-container {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }

    .fancy-button {
        position: relative;
        width: 100px;
        padding: 0.5rem 1rem;
        border-radius: 0.75rem;
        border: none;
        background: rgba(255, 0, 50, 0.18);
        color: #fff;
        font-weight: 600;
        font-size: 0.9rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        overflow: hidden;
    }

    .fancy-button::before {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        pointer-events: none;
        z-index: -1;
    }

    .fancy-button:hover::before {
        background: rgba(255, 255, 255, 0.08);
    }

    .fancy-button:hover {
        background: rgba(255, 0, 50, 0.25);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
    }
</style>
