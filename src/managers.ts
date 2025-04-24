import { type ReadableSignal, store } from 'simorg-store';

const getVisibilityState = () =>
  globalThis.document?.visibilityState !== 'hidden';

export const isWindowFocused = store(getVisibilityState());
export const isOnline = store(navigator.onLine);

export function glheraQueryListenWindowEvents() {
  const listenerFocused = () => isWindowFocused.set(getVisibilityState());
  const listenerOnline = () => isOnline.set(true);

  window.addEventListener('online', listenerOnline, false);
  window.addEventListener('offline', listenerOnline, false);

  window.addEventListener('visibilitychange', listenerFocused, false);
  return () => {
    window.removeEventListener('visibilitychange', listenerFocused);
    window.removeEventListener('online', listenerOnline);
    window.removeEventListener('offline', listenerOnline);
  };
}
