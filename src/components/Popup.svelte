<script lang="ts">
    export let message: string = "Are you sure?";
    export let onConfirm: () => void;
    export let onCancel: () => void;
    export let ldm = false;
</script>

<div
    class="popup-backdrop"
    class:ldm
    role="button"
    tabindex="0"
    onclick={onCancel}
    onkeydown={(e) => e.key === "Escape" && onCancel()}
>
    <div class="popup-card" class:ldm>
        <p class="popup-message">{message}</p>
        <div class="popup-buttons">
            <button class="popup-btn cancel" class:ldm onclick={onCancel}
                >Cancel</button
            >
            <button class="popup-btn confirm" class:ldm onclick={onConfirm}
                >Confirm</button
            >
        </div>
    </div>
</div>

<style>
    .popup-backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .popup-backdrop.ldm {
        backdrop-filter: none;
        background-color: #111;
    }

    /* Card */
    .popup-card {
        position: relative;
        background-color: rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 1rem;
        padding: 2rem 1.5rem;
        width: 300px;
        max-width: 90%;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
    }

    .popup-card.ldm {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        background-color: #222;
        box-shadow: none;
    }

    .popup-card::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.03)
        );
        filter: blur(4px);
        pointer-events: none;
        z-index: -1;
    }

    .popup-card.ldm::before {
        background: none;
        filter: none;
    }

    .popup-message {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .popup-backdrop.ldm .popup-message {
        color: #fff;
    }

    .popup-buttons {
        display: flex;
        gap: 1rem;
    }

    .popup-btn {
        padding: 0.5rem 1rem;
        border-radius: 0.75rem;
        border: none;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.9rem;
        backdrop-filter: blur(6px);
        background-color: rgba(0, 0, 0, 0.2);
        color: rgba(255, 255, 255, 0.9);
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .popup-btn.ldm {
        backdrop-filter: none;
        background-color: #333;
        box-shadow: none;
        color: #fff;
    }

    .popup-btn::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.03)
        );
        filter: blur(3px);
        pointer-events: none;
        z-index: -1;
    }

    .popup-btn.ldm::before {
        background: none;
        filter: none;
    }

    .popup-btn:hover {
        background-color: rgba(0, 0, 0, 0.25);
        box-shadow: 0 0 8px rgba(0, 255, 255, 0.1);
    }

    .popup-btn.ldm:hover {
        background-color: #333;
        box-shadow: none;
    }

    .popup-btn.confirm {
        background-color: rgba(16, 185, 129, 0.2);
    }

    .popup-btn.confirm:hover {
        box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
    }

    .popup-btn.cancel {
        background-color: rgba(255, 0, 50, 0.15);
    }

    .popup-btn.cancel:hover {
        box-shadow: 0 0 10px rgba(255, 0, 50, 0.3);
    }

    .popup-btn.confirm.ldm,
    .popup-btn.cancel.ldm {
        background-color: #333;
    }

    .popup-btn.confirm.ldm:hover,
    .popup-btn.cancel.ldm:hover {
        box-shadow: none;
    }
</style>
