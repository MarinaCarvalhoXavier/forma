// The scroll-world walkthrough at the top builds its tall scroll track only after its
// script loads, which pushes everything below it far down the page. Scroll effects
// (Reveal, WriteOn) wait for that before they measure anything; otherwise, right after a
// load or a reload that restores the scroll spot, they see their section "on screen" at
// the top of a short page and play out unseen. If the walkthrough never reports in
// (script blocked or failed), they start anyway after a few seconds.
export const LAYOUT_READY_EVENT = "scrollworld:ready";

export function whenLayoutReady(start: () => void): () => void {
  if (window.scrollWorldReady) {
    start();
    return () => {};
  }
  const go = () => {
    window.removeEventListener(LAYOUT_READY_EVENT, go);
    clearTimeout(timer);
    start();
  };
  const timer = setTimeout(go, 4000);
  window.addEventListener(LAYOUT_READY_EVENT, go);
  return () => {
    window.removeEventListener(LAYOUT_READY_EVENT, go);
    clearTimeout(timer);
  };
}
