import { type ReadableSignal, store } from 'simorg-store';

/**
 * A manager that handles the focus and online state of the browser.
 */
export interface GLHeraManager extends ReadableSignal<boolean> {
  /**
   * Listens to changes in the signal.
   * @returns A function to stop listening to changes.
   */
  listen: () => () => void;
}

/**
 * Manages the focus state of the browser.
 */
export function focusManager(): GLHeraManager {
  const getVisibilityState = () =>
    globalThis.document?.visibilityState !== 'hidden';

  //
  //

  const isFocused = store(getVisibilityState());

  //
  //

  return {
    get: isFocused.get,
    subscribe: isFocused.subscribe,
    listen() {
      const listener = () => isFocused.set(getVisibilityState());

      window.addEventListener('visibilitychange', listener, false);
      return () => window.removeEventListener('visibilitychange', listener);
    },
  };
}

/**
 * Manages the online/offline state of the browser.
 */
export function onlineManager(): GLHeraManager {
  const isOnline = store(navigator.onLine);

  //
  //

  return {
    get: isOnline.get,
    subscribe: isOnline.subscribe,
    listen() {
      const listenerOn = () => isOnline.set(true);

      window.addEventListener('online', listenerOn, false);
      window.addEventListener('offline', listenerOn, false);
      return () => {
        window.removeEventListener('online', listenerOn);
        window.removeEventListener('offline', listenerOn);
      };
    },
  };
}
