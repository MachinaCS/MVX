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
};

/** TODO: Make Documentation
 */
function scrolled(input: ScrolledObject | ScrolledObject[]): void {
    // Weryfikujemy czy `input` jest Listą `Array` czy też zwykłym Obiektem `Object`.
    // jeśli nie to zmieniamy to w forme listy `[input]`;
    const objects = Array.isArray(input) ? input : [input];

    // FUNKCJE POMOCNICZE
    
    const getScrollValue = (element: HTMLElement | Window, axis: "x" | "y"): number => {
        // Co to jest w ogóle? już tłumaczę :>
        // sprawdzamy czy podany `element` jest Window (jest instancją `Window`) 
        // jeśli tak to bieżemy odpowiedni scroll odpowiadający osi `axis` z `element: Window` jeśli nie to z `element: HTMLElement`.
        // Wiem pogmatwane, ale działa i jest pocześci czytelne tylko wymaga skupienia :}
        return element instanceof Window 
            ? axis === "y" ? element.scrollY : element.scrollX 
            : axis === "y" ? element.scrollTop : element.scrollLeft;
    };

    const getScrollSize = (element: HTMLElement | Window, axis: "x" | "y"): number => {
        // Tu podobnie jak w `getScrollValue`, lecz różnica pomiedzy `getScrollValue`, a `getScrollSize` jest taka, 
        // że samo `Window` ma wielkość okna przeglądarki co powoduje nie rzetelny odczyt wielkości dokumentu, 
        // dlatego używamy wielkość arkusza `<html>`
        return element instanceof Window 
            ? axis === "y" ? document.documentElement.scrollHeight : document.documentElement.scrollWidth 
            : axis === "y" ? element.scrollHeight : element.scrollWidth;
    };

    // Liczy każdy element w drzewie DOM i zwraca pozycje absolutną naszego elementu `offset`
    const getAbsoluteOffset = (element: HTMLElement, axis: "x" | "y"): number => {
        let offset = 0;
        let current: HTMLElement | null = element;

        while(current) {
            offset += axis === "y" ? current.offsetTop : current.offsetLeft;
            current = current.offsetParent as HTMLElement | null;
        }

        return offset;
    };

    for(const object of objects) {
        // Dlaczego `callback` jest opcjonalny, a reszta nie? callback nie musi być, 
        // ale funkcja się nie wykona jeśli nie ma co wykonywać. W taki sposób optymalizujemy nie potrzebny użytek.
        // Reszta za to jest potrzebna by nadać kierunek callbackowi kiedy co ma wykonać.

        if(!object.axis || !object.element || object.trigger == null || !object.callback) continue;

        object.direction = object.direction ? object.direction : "down";
        object.once = object.once ? object.once : false;
        object.debounce = object.debounce ? object.debounce : undefined;


        if (typeof object.element !== "object" || !("addEventListener" in object.element)) {
            console.warn("[MVX] object.element is not scrollable:", object.element);
            continue;
        }

        // Przyda się to w późniejszym etapie :>
        let lastScroll = getScrollValue(object.element, object.axis);
        let debounceTimeout: number | undefined;
        let wasTriggered: boolean = false;
        let triggerOffset: number = 0;

        // Bardzo ważna funkcja, to ona zajmuje się całym procesem, weryfikuje i wykonuje kod.
        const runCheck = () => {
            const currentScroll = getScrollValue(object.element, object.axis);
            const scrollSize = getScrollSize(object.element, object.axis);

            const isDown = currentScroll > lastScroll;

            if (typeof object.trigger === "number") 
                triggerOffset = object.trigger <= 1 ? scrollSize * object.trigger : object.trigger;
            else
                // TODO: Problem z działaniem
                triggerOffset = getAbsoluteOffset(object.trigger, object.axis);

            const isTriggered =
                (object.direction === "up" || object.direction === "left")
                    ? currentScroll <= triggerOffset
                    : currentScroll >= triggerOffset;

            if(object.callback && (isTriggered !== wasTriggered || !object._activated)) {
                object.callback({
                    isDown: isDown,
                    isTriggered: isTriggered,
                    current: currentScroll,
                    self: object.element,
                });

                if (object.once && isTriggered) {
                    object._activated = true;
                    object.element.removeEventListener("scroll", handler);
                }
            }
            
            lastScroll = currentScroll;
            wasTriggered = isTriggered;
        };
        
        const handler = () => {
            object.debounce = !object.debounce ? 0 : object.debounce;
            object.debounce > 0 
                ? (clearTimeout(debounceTimeout), debounceTimeout = window.setTimeout(runCheck, object.debounce)) 
                : runCheck();
        };
        
        runCheck();
        object.element.addEventListener("scroll", handler);
    };
};

const exports = {
    scrolled: scrolled,
}

export default exports;