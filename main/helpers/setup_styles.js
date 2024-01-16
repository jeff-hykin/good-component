export { css, cx } from 'https://cdn.skypack.dev/-/@emotion/css@v11.10.5-uWGULTiBZCR27o2j9H2P/dist=es2019,mode=imports/optimized/@emotion/css.js';

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