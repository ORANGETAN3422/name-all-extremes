<script lang="ts">
    import { onMount } from "svelte";
    import { fetchLevels } from "../lib/api";
    import Timer from "./Timer.svelte";

    export let levels: any[] = [];
    export let namedLevels: any[] = [];
    export let secondsElapsed: number = 0;
    export let showPopup: boolean = false;
    export let ldm = false;

    let extreme = "";
    let error = "";
    let errorFlash = false;
    let successFlash = false;
    let loadingLevels = false;
    let timerRef: any;

    function checkLevel() {
        const cleanInput = extreme
            .toLowerCase()
            .trim()
            .replace(/\[.*?\]|\(.*?\)/g, "")
            .trim();

        const matchedLevels = levels.filter((l) => {
            const cleanLevelName = l.name
                .toLowerCase()
                .replace(/\[.*?\]|\(.*?\)/g, "")
                .trim();
            return cleanLevelName === cleanInput;
        });

        if (matchedLevels.length === 0) {
            const alreadyNamed = namedLevels.some((l) => {
                const cleanNamed = l.name
                    .toLowerCase()
                    .replace(/\[.*?\]|\(.*?\)/g, "")
                    .trim();
                return cleanNamed === cleanInput;
            });

            error = alreadyNamed
                ? "Already named that extreme"
                : "That extreme doesn't exist";
            errorFlash = true;
            return;
        }

        const newNamedLevels = matchedLevels.filter(
            (l) =>
                !namedLevels.some(
                    (n) =>
                        n.name.toLowerCase().trim() ===
                        l.name.toLowerCase().trim(),
                ),
        );

        if (newNamedLevels.length === 0) {
            error = "Already named that extreme";
            errorFlash = true;
            return;
        }

        namedLevels = [...namedLevels, ...newNamedLevels].sort(
            (a, b) => a.position - b.position,
        );

        extreme = "";
        error = "";
        errorFlash = false;
        successFlash = true;

        setTimeout(() => (successFlash = false), 300);

        saveState();

        if (levels.length === namedLevels.length) {
            timerRef?.stopTimer();
        }
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

    function requestRestart() {
        showPopup = true;
    }

    export function restartGame() {
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

        loadingLevels = true;
        fetchLevels().then((l) => {
            levels = l;
            loadingLevels = false;
        });

        showPopup = false;
    }

    onMount(() => {
        const savedLevels = localStorage.getItem("levels");
        const savedNamedLevels = localStorage.getItem("namedLevels");
        const savedTimer = localStorage.getItem("timer");

        if (savedLevels && savedNamedLevels) {
            levels = JSON.parse(savedLevels);
            namedLevels = JSON.parse(savedNamedLevels);
            if (savedTimer) secondsElapsed = JSON.parse(savedTimer);
        } else {
            loadingLevels = true;
            fetchLevels().then((l) => {
                levels = l;
                loadingLevels = false;
            });
        }
    });
</script>

<div class="min-h-screen flex" class:ldm>
    <div class="flex-1 min-h-screen rounded-2xl p-0.5" class:radial-bg={!ldm}>
        <div
            class="w-full h-full rounded-2xl p-6 pt-10 flex flex-col text-center relative overflow-hidden shadow-2xl"
            class:bg-layer={!ldm}
        >
            <div
                class="absolute inset-0 rounded-2xl pointer-events-none blur-[2px]"
                class:linear-bg={!ldm}
            ></div>

            <h1
                class="relative text-2xl font-semibold tracking-tight mb-6"
                class:text-white={!ldm}
            >
                Name All Extremes
            </h1>

            <label for="extreme" class="relative pb-2" class:text-white={!ldm}
                >Enter names here</label
            >
            <input
                id="extreme"
                bind:value={extreme}
                type="text"
                placeholder="e.g. Bloodbath"
                oninput={handleInput}
                onkeydown={(e) => e.key === "Enter" && checkLevel()}
                class="fancy-input"
                class:error={errorFlash && !ldm}
                class:success={successFlash && !ldm}
            />

            {#if error}
                <p class="mt-2 text-sm text-red-500 relative">{error}</p>
            {/if}

            <p class="mt-4 text-xs relative" class:text-white={!ldm}>
                Try and list every extreme you can think of. Good Luck!
            </p>

            <h2
                class="relative text-2xl font-semibold tracking-tight pt-6 transition duration-300"
                class:success={successFlash && !ldm}
                class:text-white={!ldm}
            >
                {#if loadingLevels}
                    ...
                {:else}
                    {namedLevels.length} / {levels.length} Named
                {/if}
            </h2>

            <Timer bind:secondsElapsed bind:this={timerRef} />

            <div class="button-container">
                <button class="fancy-button restart" onclick={requestRestart}>
                    Restart
                </button>
            </div>

            <div class="flex-1"></div>
        </div>
    </div>
</div>

<style>
    .ldm {
        background: oklch(26.133% 0.05013 173.129 / 0.178) !important;
        color: #fff;
    }

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

    .bg-layer {
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(12px);
        border: 2px solid transparent;
    }

    .fancy-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        background: rgba(0, 0, 0, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.034);
        outline: none;
        transition: all 0.3s ease;
    }

    .fancy-input.error {
        border-color: #ff002b79;
        box-shadow: 0 0 6px rgba(245, 101, 101, 0.6);
    }

    .fancy-input.success {
        border-color: #10b98179;
        box-shadow: 0 0 6px rgba(5, 150, 105, 0.6);
    }

    .fancy-input:focus {
        border-color: #06b6d479;
        box-shadow: 0 0 4px rgba(0, 255, 255, 0.4);
    }

    h2.success {
        color: #10b981;
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
        box-shadow: 0 0 10px rgba(255, 0, 50, 0.3);
    }
</style>
