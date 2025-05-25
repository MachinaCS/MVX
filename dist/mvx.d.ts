/** Obiekt konfiguracyjny dla obserwatora scrolla. */
interface ScrolledObject {
    /** Obserwowany element – `window` lub element z overflow scroll. */
    element: HTMLElement | Window;
    /** Kierunek osi scrolla – "x" dla poziomego, "y" dla pionowego. */
    axis: "x" | "y";
    /** Kierunek, w którym ma być sprawdzane spełnienie triggera. */
    direction?: "up" | "down" | "left" | "right";
    /** Punkt aktywacji scrolla – jako liczba (np. 300) lub obiekt triggera. */
    trigger: number | HTMLElement;
    /** Funkcja wywoływana po spełnieniu warunku scrolla. */
    callback?: (event: ScrolledCallbackEvent) => void;
    /** Czy callback powinien zostać wykonany tylko raz. */
    once?: boolean;
    /** Czas debounce w ms, by opóźnić reakcję na scroll. */
    debounce?: number;
    /** Flaga prywatna – informuje, że callback został już wykonany. */
    _activated?: boolean;
}
/** TODO: Make Documentation
 */
interface ScrolledCallbackEvent {
    /** TODO: Make Documentation
     */
    isDown: boolean;
    /** TODO: Make Documentation
     */
    isTriggered: boolean;
    /** TODO: Make Documentation
     */
    current: number;
    /** TODO: Make Documentation
     */
    self: HTMLElement | Window;
}
/** TODO: Make Documentation
 */
declare function scrolled(input: ScrolledObject | ScrolledObject[]): void;
declare const exports: {
    scrolled: typeof scrolled;
};
export default exports;
