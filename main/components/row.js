import { html, passAlongProps } from "../imports.js"
import { css, cx } from "../helpers/css.bundle.js"
import { combineClasses, setupClassStyles, setupStyles } from "../helpers.js"
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
    const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment // css is a special breed of inconsistent
    arg = setupStyles(arg, `
        display: flex;
        flex-direction: row;
        transition: all 0.4s ease-in-out 0s;
        justify-content: ${justify};
        align-items: ${align};
        text-align: ${horizontalAlignment};
        vertical-align: ${verticalText};
    `)

    // 
    // element
    // 
    const div = document.createElement(`div`)
    passAlongProps(div, arg)
    return div
}