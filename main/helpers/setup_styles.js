import { css, cx } from "./css.bundle.js"

// 
// create helper element for styles and such
// 
const setupStyles = (arg, styles)=>{
    if (arg.styles) {
        arg.styles = `${styles};${css(arg.styles)};`
    } else {
        arg.styles = styles
    }
    return arg
}
export default setupStyles