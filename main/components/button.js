import { html, passAlongProps } from "../imports.js"
import { css, cx } from "../../main/helpers/css.bundle.js"
import { combineClasses, setupClassStyles, setupStyles } from "../helpers.js"

// 
// Button
// 
const buttonClass = css`
    border-radius: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    -webkit-appearance: button;
    overflow: visible;
    text-transform: none;
    cursor: pointer;
`
// TODO:
// `::-moz-focus-inner   { border-style: none; padding: 0;}`,
export function Button(arg) {
    // 
    // class
    // 
    arg       = setupClassStyles(arg)
    arg.class = combineClasses(buttonClass, arg.class)
    
    // 
    // element
    // 
    const button = document.createElement(`button`)
    passAlongProps(button, arg)
    return button
}