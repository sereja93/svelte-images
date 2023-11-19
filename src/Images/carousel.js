export { default as Modal } from "./Modal.svelte";

import Carousel from "./Carousel.svelte";
import { open as openStore, close as closeStore } from "./modalStore.js";


export const open = (images, curr_idx, showDownloadBtn, imageDownloadClickAction) => {
  openStore(Carousel, { images, curr_idx, showDownloadBtn, imageDownloadClickAction })
};
export const close = closeStore;