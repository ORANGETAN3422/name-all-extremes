<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    export let secondsElapsed: number = 0;
    let timer: number | undefined;

    function formatTime(sec: number): string {
        const hours: number = Math.floor(sec / 3600);
        const minutes: number = Math.floor((sec % 3600) / 60);
        const seconds: number = sec % 60;

        const hDisplay = hours.toString().padStart(2, "0");
        const mDisplay = minutes.toString().padStart(2, "0");
        const sDisplay = seconds.toString().padStart(2, "0");

        if (hours > 0) return `${hDisplay}:${mDisplay}:${sDisplay}`;
        else return `${mDisplay}:${sDisplay}`;
    }

    function startTimer(): void {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            secondsElapsed += 1;
            localStorage.setItem("timer", JSON.stringify(secondsElapsed));
        }, 1000);
    }

    function stopTimer(): void {
        if (timer) clearInterval(timer);
        timer = undefined;
    }

    function resetTimer(): void {
        stopTimer();
        secondsElapsed = 0;
    }

    onDestroy(() => {
        if (timer) clearInterval(timer);
    });

    onMount(() => {
        startTimer();
        const savedTimer = localStorage.getItem("timer");
        if (savedTimer) secondsElapsed = JSON.parse(savedTimer);
    });
</script>

<h2 class="text-emerald-400/80">{formatTime(secondsElapsed)}</h2>
