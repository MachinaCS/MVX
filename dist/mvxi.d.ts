/**
 * Configuration interface for the `scrolled` function.
 *
 * Defines how scroll-based triggers should be handled, including axis, direction,
 * trigger point, debounce timing, and callback behavior.
 */
interface ScrolledObject {
    /**
     * The element being observed for scroll events.
     *
     * Can be the global `window` object or a specific scrollable `HTMLElement`.
     */
    element: HTMLElement | Window;
    /**
     * The axis on which to detect scroll activity.
     *
     * - `"x"` for horizontal scrolling.
     * - `"y"` for vertical scrolling.
     */
    axis: "x" | "y";
    /**
     * (Optional) The intended scroll direction that activates the trigger.
     *
     * - `"up"` or `"down"` for vertical scrolling.
     * - `"left"` or `"right"` for horizontal scrolling.
     *
     * If omitted, the trigger will activate regardless of scroll direction.
     */
    direction?: "up" | "down" | "left" | "right";
    /**
     * The point at which the scroll should trigger the callback.
     *
     * Can be:
     * - A `number` representing a fixed offset in pixels.
     * - An `HTMLElement`, where its position on the page will determine the trigger point.
     */
    trigger: number | HTMLElement;
    /**
     * (Optional) A function to be called when the trigger condition is met.
     *
     * Receives a `ScrolledCallbackEvent` containing scroll state details.
     */
    callback?: (event: ScrolledCallbackEvent) => void;
    /**
     * (Optional) If set to `true`, the callback will be executed only once per session.
     *
     * Useful for animations or one-time events on scroll.
     */
    once?: boolean;
    /**
     * (Optional) Time in milliseconds to debounce the scroll event handler.
     *
     * Helps reduce callback frequency for performance optimization.
     */
    debounce?: number;
    /**
     * (Internal) Indicates whether the callback has already been executed.
     *
     * Used internally when `once` is `true`.
     */
    _activated?: boolean;
}
/**
 * Callback event interface used by the `scrolled` function.
 *
 * Provides detailed information about the current scroll state and trigger conditions.
 */
interface ScrolledCallbackEvent {
    /**
     * Indicates whether the user is currently scrolling down.
     *
     * `true` if the scroll direction is downward compared to the last recorded position;
     * `false` if scrolling upward or stationary.
     */
    isDown: boolean;
    /**
     * Indicates whether the scroll position has reached or passed the specified trigger point.
     *
     * `true` if the trigger condition has been met;
     * `false` otherwise.
     */
    isTriggered: boolean;
    /**
     * The current scroll position on the relevant axis.
     *
     * Typically represents `scrollTop` (for vertical scrolling) or `scrollLeft` (for horizontal),
     * depending on the configuration of the `scrolled` function.
     */
    current: number;
    /**
     * The source element or window object that is being observed for scroll events.
     *
     * This is either a specific scrollable container (`HTMLElement`) or the global `window`.
     */
    self: HTMLElement | Window;
}
/**
 * Observes scroll events on one or multiple elements and triggers a callback when a specified scroll position is reached.
 *
 * This function is useful for scroll-based interactions such as animations, lazy loading,
 * or triggering UI changes when certain sections enter the viewport or reach a given threshold.
 *
 * @param input - A single `ScrolledObject` configuration or an array of such configurations.
 *
 * ### Features:
 * - Supports vertical (`y`) and horizontal (`x`) scrolling.
 * - Detects scroll direction (`up`, `down`, `left`, `right`).
 * - Trigger point can be a static number or a DOM element.
 * - Optional debounce to optimize performance.
 * - Option to trigger callback only once.
 *
 * ### Example:
 * ```ts
 * scrolled({
 *   element: window,
 *   axis: "y",
 *   trigger: 300,
 *   callback: ({ isDown, isTriggered }) => {
 *     if (isTriggered) console.log("You scrolled past 300px!", isDown);
 *   },
 *   once: true,
 *   debounce: 50
 * });
 * ```
 */
declare function scrolled(input: ScrolledObject | ScrolledObject[]): void;
declare const _default: {
    scrolled: typeof scrolled;
};
export default _default;
