const box1 = document.querySelector("div#box1");
const box2 = document.querySelector("div#box2");
const box3 = document.querySelector("div#box3");

MVX.scrolled([
    {
        element: window,
        axis: "y",
        direction: "down",
        trigger: 0,
        callback: event => {
            box1.style.top = event.isDown ? `-${box1.clientHeight}px` : "0px";
            box2.style.top = event.isDown ? "0px" : `${box1.clientHeight}px`;
        },
    },
    {
        element: window,
        axis: "y",
        direction: "down",
        trigger: 500,
        callback: event => {
            event.isTriggered 
            ? (box3.style.top = event.isDown ? `${box1.clientHeight}px` : `${box1.clientHeight + box2.clientHeight}px`, box3.style.position = 'fixed') 
            : (box3.style.position = 'unset', box3.style.top = "0px");  
        },
    }
]);