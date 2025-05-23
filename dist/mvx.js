"use strict";
/**
 * Reaguje na scroll danego elementu zgodnie z kierunkiem, osią i triggerem.
 * Wywołuje callback z informacją, czy scroll był w dół i czy trigger został przekroczony.
 */
function scrolled(input) {
    const objects = Array.isArray(input) ? input : [input];
    const getScrollValue = (el, axis) => el instanceof Window
        ? axis === "y" ? el.scrollY : el.scrollX
        : axis === "y" ? el.scrollTop : el.scrollLeft;
    const getScrollSize = (el, axis) => el instanceof Window
        ? axis === "y"
            ? document.documentElement.scrollHeight
            : document.documentElement.scrollWidth
        : axis === "y"
            ? el.scrollHeight
            : el.scrollWidth;
    for (const obj of objects) {
        const { element, axis, direction, trigger = 0, debounce = 0, once = false, callback, } = obj;
        if (!element || !axis || !direction || trigger == null)
            continue;
        let lastScroll = getScrollValue(element, axis);
        let timeout;
        let wasTriggered = false;
        const runCheck = () => {
            const currentScroll = getScrollValue(element, axis);
            const isDown = currentScroll > lastScroll;
            const scrollSize = getScrollSize(element, axis);
            const targetTrigger = trigger <= 1 ? scrollSize * trigger : trigger;
            const isTriggered = (direction === "up" || direction === "left")
                ? currentScroll <= targetTrigger
                : currentScroll >= targetTrigger;
            if (callback && (isTriggered !== wasTriggered || !obj._activated)) {
                callback({
                    isDown,
                    isTriggered,
                    axis,
                    direction,
                    currentScroll,
                    self: element,
                });
                if (once && isTriggered) {
                    obj._activated = true;
                    element.removeEventListener("scroll", handler);
                }
            }
            wasTriggered = isTriggered;
            lastScroll = currentScroll;
        };
        const handler = () => {
            if (debounce > 0) {
                clearTimeout(timeout);
                timeout = window.setTimeout(runCheck, debounce);
            }
            else {
                runCheck();
            }
        };
        // Uruchom natychmiast na starcie
        runCheck();
        element.addEventListener("scroll", handler);
    }
}
