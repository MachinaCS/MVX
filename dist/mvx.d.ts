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
    trigger?: number;
    debounce?: number;
    once?: boolean;
    callback?: (event: ScrolledCallbackEvent) => void;
    _activated?: boolean;
}
declare var define: {
    (deps: string[], factory: (...args: any[]) => any): void;
    amd: any;
};
