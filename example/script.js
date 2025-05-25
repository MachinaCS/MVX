const header = document.querySelector("header#header");
const breadcrumb = document.querySelector("nav#breadcrumb");
const menu = document.querySelector("nav#menu");

MVXI.scrolled([
    {
        element: window,
        axis: "y",
        trigger: 0.2,
        callback: event => {
            header.style.top = event.isDown ? `-${header.clientHeight + 1}px` : "0px";
            breadcrumb.style.top = event.isDown ? "0px" : `${header.clientHeight + 1}px`;
        }
    },
    {
        element: window,
        axis: "y",
        trigger: menu,
        callback: event => {
            event.isTriggered 
                ? event.isDown 
                    ? menu.style = `position: fixed; top: ${breadcrumb.clientHeight + 2}px;` 
                    : menu.style = `position: fixed; top: ${header.clientHeight + breadcrumb.clientHeight + 2}px;`
                : menu.style = `position: relative; top: unset;`;
        }
    }
]);