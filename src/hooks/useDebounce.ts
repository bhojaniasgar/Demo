import { useCallback, useRef } from 'react';

/**
 * Returns a debounced version of the given function.
 *
 * The debounced function will only be called once after the given delay after the last time it was called.
 * If the debounced function is called multiple times before the delay has passed, all calls but the last one will be ignored.
 *
 * @param callback The function to debounce.
 * @param delay The delay in milliseconds.
 * @returns The debounced function.
 */
export function useDebounce<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): T {
    const timeoutRef = useRef<NodeJS.Timeout>();

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    ) as T;
}
