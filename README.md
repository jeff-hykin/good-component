### What is this?

A pure-js toolkit for UI elements that I made mostly for myself.


### How to use

```js
import { css, components, Column, Row, askForFiles, showToast, Code, Markdown, Input, Button, Checkbox, Dropdown, popUp, Toastify, cx, } from "https://deno.land/x/good_component@0.2.3/elements.js"
import { fadeIn, fadeOut } from "https://deno.land/x/good_component@0.2.3/main/animations.js"
import { setupStyles, createCssClass, setupClassStyles, hoverStyleHelper, combineClasses, mergeStyles, AfterSilent } from "https://deno.land/x/good_component@0.2.3/main/helpers.js"

showToast("Howdy!", {
    backgroundColor: "#7D0A0A",
    position: 'right',
    gravity: "bottom",
    duration: 8000,
})
```

### How to build

```sh
deno install -n deno_bundle -Afr https://raw.githubusercontent.com/jeff-hykin/deno_bundle/master/main.js
deno_bundle ./elements.jsx > ./elements.js
```