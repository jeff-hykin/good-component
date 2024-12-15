import { css, cx } from "./css.bundle.js"

// 
// create helper element for styles and such
// 
const setupStyles = (arg, style)=>{
    if (arg.style) {
        arg.style = `${style};${css(arg.style)};`
    } else {
        arg.style = style
    }
    return arg
}
export default setupStyles