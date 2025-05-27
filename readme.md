# MVXI

**MVXI** — *A modern HTML and JavaScript Framework*

MVXI is a lightweight utility framework designed to simplify front-end behavior using plain HTML and JavaScript. No dependencies. No clutter. Just direct, elegant interactions.

## ✨ Examples
### 1. Function `scrolled`

### Using:

#### In the Browser
```html
<script src="mvxi.js"></script>
```
#### In Node (ESM)
```js
import MVXI from "mvxi";
```
#### Local Import (Module)
```js
import MVXI from "./mvxi.js";
```


#### Basic Example:
```js
MVXI.scrolled({
    element: window,
    axis: "y",
    trigger: 200,
    callback: ({ isTriggered }) => {
        if (isTriggered) {
            console.log("Scrolled past 200px!");
        }
    }
});
```

#### Trigger on Scrollable Element:
```js
const container = document.querySelector(".scrollable");

MVXI.scrolled({
    element: container,
    axis: "y",
    trigger: 100,
    callback: ({ isTriggered }) => {
        if (isTriggered) {
            container.classList.add("scrolled-past");
        }
    }
});
```

#### Trigger Once, with Debounce:
```js
MVXI.scrolled({
    element: window,
    axis: "y",
    trigger: 500,
    once: true,
    debounce: 100,
    callback: ({ isTriggered, isDown }) => {
        if (isTriggered && isDown) {
            console.log("User scrolled down past 500px (once)!");
        }
    }
});
```

#### Trigger on Element Position:
```js
const section = document.querySelector("#contact");

MVXI.scrolled({
    element: window,
    axis: "y",
    trigger: section,
    callback: ({ isTriggered }) => {
        if (isTriggered) {
            section.classList.add("active");
        }
    }
});
```

## 📦 Installation

```bash
npm install mvxi