import { html, passAlongProps } from "../imports.js"
import { css, cx } from "../../main/helpers/css.bundle.js"
import { combineClasses, setupClassStyles, setupStyles } from "../helpers.js"
import { translateAlignment } from "../helpers/translate_alignment.js"

// 
// Column
// 
const columnClass = css`
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease-in-out 0s;
`
export function Column({ verticalAlignment, horizontalAlignment, ...arg }) {
    // 
    // class
    // 
    arg       = setupClassStyles(arg)
    arg.class = combineClasses(columnClass, arg.class)
    
    // 
    // style
    // 
    const justify = translateAlignment(verticalAlignment || "top")
    const align = translateAlignment(horizontalAlignment || "left")
    const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment // css is a special breed of inconsistent
    arg = setupStyles(arg, `
        display: flex;
        flex-direction: column;
        transition: all 0.4s ease-in-out 0s;
        justify-content: ${justify};
        align-items: ${align};
        text-align: ${horizontalAlignment};
        vertical-align: ${verticalText};
    `)
    
    const div = document.createElement(`div`)
    passAlongProps(div, arg)
    return div
}