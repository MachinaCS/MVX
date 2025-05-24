interface ScrolledCallbackEvent {
    isDown: boolean;
    isTriggered: boolean;
    axis: "x" | "y";
    direction: "up" | "down" | "left" | "right";
    currentScroll: number;
    self: HTMLElement | Window;
}

interface ScrolledObject {
    axis: "x" | "y";
    direction: "up" | "down" | "left" | "right";
    element: HTMLElement | Window;
    trigger?: number;                // np. 300 lub 0.8 (dla 80% długości)
    debounce?: number;               // np. 150 ms
    once?: boolean;                  // wywołaj tylko raz
    callback?: (event: ScrolledCallbackEvent) => void;
    _activated?: boolean;            // wewnętrzna flaga (nie podajesz samodzielnie)
}

declare var define: {
  (deps: string[], factory: (...args: any[]) => any): void;
  amd: any;
};

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory); // AMD
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(); // CommonJS / Node
    } else {
        (root as any).MVX = factory(); // Global (browser)
    }
}(typeof self !== 'undefined' ? self : this, function () {

    function scrolled(input: ScrolledObject | ScrolledObject[]): void {
        const objects = Array.isArray(input) ? input : [input];

        const getScrollValue = (el: HTMLElement | Window, axis: "x" | "y"): number => {
            return el instanceof Window
                ? axis === "y" ? el.scrollY : el.scrollX
                : axis === "y" ? el.scrollTop : el.scrollLeft;
        };

        const getScrollSize = (el: HTMLElement | Window, axis: "x" | "y"): number => {
            return el instanceof Window
                ? axis === "y" ? document.documentElement.scrollHeight : document.documentElement.scrollWidth
                : axis === "y" ? el.scrollHeight : el.scrollWidth;
        };

        for (const obj of objects) {
            const {
                element,
                axis,
                direction,
                trigger = 0,
                debounce = 0,
                once = false,
                callback,
            } = obj;

            if (!element || !axis || !direction || trigger == null) continue;

            let lastScroll = getScrollValue(element, axis);
            let timeout: number | undefined;
            let wasTriggered = false;

            const runCheck = () => {
                const currentScroll = getScrollValue(element, axis);
                const isDown = currentScroll > lastScroll;

                const scrollSize = getScrollSize(element, axis);
                const targetTrigger = trigger <= 1 ? scrollSize * trigger : trigger;

                const isTriggered =
                    (direction === "up" || direction === "left")
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
                        (element as HTMLElement).removeEventListener("scroll", handler);
                    }
                }

                wasTriggered = isTriggered;
                lastScroll = currentScroll;
            };

            const handler = () => {
                if (debounce > 0) {
                    clearTimeout(timeout);
                    timeout = window.setTimeout(runCheck, debounce);
                } else {
                    runCheck();
                }
            };

            runCheck(); // Uruchomienie natychmiast na starcie
            element.addEventListener("scroll", handler);
        }
    }

    return {
        scrolled
    };
}));