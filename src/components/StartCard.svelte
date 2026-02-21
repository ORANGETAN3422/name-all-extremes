<script lang="ts">
    export let levels: any[] = [];
    export let namedLevels: any[] = [];

    let extreme = "";
    let error = "";
    let errorFlash = false;

    function checkLevel() {
        const cleanString = extreme.toLowerCase();
        const level = levels.find((l) => l.name.toLowerCase() === cleanString);

        if (!level) {
            if (namedLevels.find((l) => l.name.toLowerCase() === cleanString))
                error = "Already named that extreme";
            else error = "That extreme doesn't exist";

            errorFlash = true;
            return;
        }

        namedLevels = [...namedLevels, level];
        levels = levels.filter((l) => l !== level);
        namedLevels = namedLevels.sort((a, b) => a.position - b.position);

        extreme = "";
        error = "";
        errorFlash = false;
    }

    function handleInput() {
        if (errorFlash) {
            errorFlash = false;
            error = "";
        }
    }
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
                class={`fancy-input ${errorFlash ? "error" : ""}`}
            />

            {#if error}
                <p class="mt-2 text-sm text-red-500 relative">{error}</p>
            {/if}

            <p class="mt-4 text-xs text-white/50 relative">
                Try and list every extreme you can think of. Good Luck!
            </p>

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
</style>
