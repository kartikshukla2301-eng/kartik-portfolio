/**
 * Intro gate. An inline script in <head> (see layout.tsx) sets <html data-intro="playing|done">
 * before first paint: "done" for returning visitors in the same session or with ?noloader.
 * Sections that animate on load wait for it with whenIntroDone().
 */

export const INTRO_EVENT = "intro:done";
export const INTRO_SESSION_KEY = "ks-intro";

/** Inline script run before hydration. Kept as a string so layout.tsx can inject it. */
// - The browser must not restore an old scroll position: the page always opens at the top
//   (unless the URL has a #hash).
// - A reload (F5 / hard reload) replays the intro; a fresh visit in the same session does not.
export const INTRO_BOOT_SCRIPT = `(function(){var d=document.documentElement;if(location.pathname.indexOf('/admin')===0){d.setAttribute('data-intro','done');return}try{if('scrollRestoration' in history){history.scrollRestoration='manual'}if(!location.hash){window.scrollTo(0,0)}var nav=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];var reload=!!nav&&nav.type==='reload';if(reload){try{sessionStorage.removeItem('${INTRO_SESSION_KEY}')}catch(e){}}var seen=false;try{seen=sessionStorage.getItem('${INTRO_SESSION_KEY}')==='1'}catch(e){}var skip=location.search.indexOf('noloader')>-1||(seen&&!reload)||window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.setAttribute('data-intro',skip?'done':'playing')}catch(e){d.setAttribute('data-intro','done')}})();`;

export function isIntroPlaying(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.intro === "playing";
}

export function markIntroDone(): void {
  document.documentElement.dataset.intro = "done";
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    // Storage can be blocked (private mode); the loader will simply show again next visit.
  }
  window.dispatchEvent(new Event(INTRO_EVENT));
}

/** Run `cb` once the intro loader has finished (immediately if it is not playing). Returns a cleanup. */
export function whenIntroDone(cb: () => void): () => void {
  if (!isIntroPlaying()) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(INTRO_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, handler);
}
