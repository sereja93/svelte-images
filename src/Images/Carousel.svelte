<script>
    import Image from "./Image.svelte";
    import {close} from "./modalStore.js";
    import {debounce} from "../util.js";
    import ClickOutside from "./ClickOutside.svelte";

    export let images;
    export let curr_idx = 0;
    export let showDownloadBtn = false;
    export let imageDownloadClickAction = null;
    let left_nav_button;
    let right_nav_button;
    let download_element;
    const image_elements = new Array(images.length);
    let translateX = -curr_idx * window.innerWidth;

    function increment(num) {
        return num >= images.length - 1 ? 0 : num + 1;
    }

    function decrement(num) {
        return num === 0 ? images.length - 1 : num - 1;
    }

    function right() {
        curr_idx = increment(curr_idx);
        updatePosition();
    }

    function left() {
        curr_idx = decrement(curr_idx);
        updatePosition();
    }

    function updatePosition() {
        translateX = -curr_idx * window.innerWidth;
    }

    const debouncedClose = debounce(close, 100, true);

    function handleClose() {
        debouncedClose();
    }

    let onClickDownload = () => {
        let click = imageDownloadClickAction
        if (click) {
            click(images[curr_idx].src)
        }
    };
</script>

<style>
    .container {
        position: relative;
    }

    .carousel {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1) 0s,
        opacity 500ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
    }

    .nav {
        display: flex;
        box-sizing: border-box;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        position: absolute;
        width: 100vw;
        height: 100%;
        z-index: 4;
    }

    :global(.carousel img) {
        height: auto;
        max-width: 80vw;
        max-height: 85vh;
        margin: auto;
        user-select: none;
    }

    :global(.carousel .click-outside-wrapper) {
        display: flex;
    }

    .img-container {
        display: flex;
        justify-content: center;
        width: 100vw;
    }

    .nav button {
        cursor: pointer;
        background: transparent;
        border: none;
        outline: none !important;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 5em;
        height: 5em;
        display: flex;
        color: white;
        margin: 0 17px;
    }

    .nav button:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    .nav svg {
        display: inline-block;
        fill: currentcolor;
        height: 5em;
        width: 5em;
        stroke: currentcolor;
        stroke-width: 0;
    }

    @media (max-width: 800px) {
        :global(.carousel img) {
            max-width: 75vw;
        }

        .nav button {
            margin: 0 12px;
            width: 4em;
            height: 4em;
        }

        .nav svg {
            width: 4em;
            height: 4em;
        }
    }

    @media (max-width: 550px) {
        :global(.carousel img) {
            max-width: 100vw;
        }

        .nav button {
            margin: 0 10px;
            width: 3em;
            height: 3em;
        }

        .nav svg {
            width: 3em;
            height: 3em;
        }
    }

    .rr {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

</style>

<svelte:window on:resize={updatePosition}/>
<div class="container">
    <div class="nav">
        <button on:click={left} bind:this={left_nav_button}>
            <svg role="presentation" viewBox="0 0 24 24">
                <path
                        d="M15.422 16.078l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z"/>
            </svg>
        </button>

        {#if showDownloadBtn}
            <div class="rr">
                <div></div>
                <button on:click={right} bind:this={right_nav_button}>
                    <svg role="presentation" viewBox="0 0 24 24">
                        <path d="M9.984 6l6 6-6 6-1.406-1.406 4.594-4.594-4.594-4.594z"/>
                    </svg>
                </button>

                <button bind:this={download_element} on:click={onClickDownload}>
                    <svg style="transform: scale(0.7)" viewBox="0 0 24 24">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M13 10h5l-6 6-6-6h5V3h2v7zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7z"/>
                        </g>
                    </svg>
                </button>
            </div>

        {:else}
            <button on:click={right} bind:this={right_nav_button}>
                <svg role="presentation" viewBox="0 0 24 24">
                    <path d="M9.984 6l6 6-6 6-1.406-1.406 4.594-4.594-4.594-4.594z"/>
                </svg>
            </button>
        {/if}
    </div>
    <div
            class="carousel"
            style={`transform: translate3d(${translateX}px, 0, 0);`}>
        <ClickOutside
                className="click-outside-wrapper"
                on:clickoutside={handleClose}
                exclude={[left_nav_button, right_nav_button, ...image_elements, download_element]}>
            {#each images as image, i}
                <div class="img-container">
                    <Image imageProps={image} bind:this={image_elements[i]}/>
                </div>
            {/each}

        </ClickOutside>
    </div>
</div>
