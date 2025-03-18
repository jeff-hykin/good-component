### What is this?

A pure-js toolkit for UI elements that I made mostly for myself.


### How to use

```js
import { css, components, Column, Row, askForFiles, Code, Markdown, Input, Button, Checkbox, Dropdown, popUp, cx, } from "https://esm.sh/gh/jeff-hykin/good-component@0.3.2/elements.js"
import { fadeIn, fadeOut } from "https://esm.sh/gh/jeff-hykin/good-component@0.3.2/main/animations.js"
import { addDynamicStyleFlags, createCssClass, setupClassStyles, hoverStyleHelper, combineClasses, mergeStyles, AfterSilent, removeAllChildElements } from "https://esm.sh/gh/jeff-hykin/good-component@0.3.2/main/helpers.js"
import { showToast } from "https://esm.sh/gh/jeff-hykin/good-component@0.3.2/main/actions.js"

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