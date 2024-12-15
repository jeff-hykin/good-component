import { html, passAlongProps } from "../imports.js"
import { css, cx } from "../helpers/css.bundle.js"
import { combineClasses, setupClassStyles } from "../helpers.js"
import { translateAlignment } from "../helpers/translate_alignment.js"

const rowClass = css`
    display: flex;
    flex-direction: row;
    transition: all 0.4s ease-in-out 0s;
`
export function Row({ verticalAlignment, horizontalAlignment, ...arg }) {
    // 
    // class
    // 
    arg       = setupClassStyles(arg)
    arg.class = combineClasses(rowClass, arg.class)
    
    // 
    // style
    // 
    const justify = translateAlignment(horizontalAlignment || "left")
    const align = translateAlignment(verticalAlignment || "top")
    const div = document.createElement(`div`)
    // local stuff first, so that props can override
    passAlongProps(div, {
        style: `
            justify-content: ${justify};
            align-items: ${align};
            text-align: ${horizontalAlignment||'inherit'};
        `.replace(/\s+/g, " ").trim(), // replace is to help bundle optimizers
    })
    
    passAlongProps(div, arg)
    return div
}