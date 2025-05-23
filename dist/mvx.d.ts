interface ScrolledObject {
    axis: "x" | "y";
    direction: "up" | "down" | "left" | "right";
    element: HTMLElement | Window;
    trigger?: number;
    debounce?: number;
    once?: boolean;
    callback?: (event: ScrolledCallbackEvent & {
        self: HTMLElement | Window;
    }) => void;
    _activated?: boolean;
}
interface ScrolledCallbackEvent {
    isDown: boolean;
    isTriggered: boolean;
    axis: "x" | "y";
    direction: "up" | "down" | "left" | "right";
    currentScroll: number;
}
/**
 * Reaguje na scroll danego elementu zgodnie z kierunkiem, osią i triggerem.
 * Wywołuje callback z informacją, czy scroll był w dół i czy trigger został przekroczony.
 */
declare function scrolled(input: ScrolledObject | ScrolledObject[]): void;
