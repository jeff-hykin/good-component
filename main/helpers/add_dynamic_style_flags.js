const nullFunc = ()=>0
export const dynamicStyler = Symbol("dynamicStyler")

/**
 * addDynamicStyleFlags
 *
 * @example
 * ```js
 *    //
 *    let div = document.createElement("div") 
 *    addDynamicStyleFlags({
 *        element: div,
 *        styleFunc: (element)=>{
 *            element.style.color = element.isHovered ? "white" : "black"
 *        },
 *        flagKeys: {
 *            isHovered: [ "mouseover", "mouseout" ],
 *            isFocused: [ "focus", "blur" ],
 *        }
 *    })
 * ```
 */
const addDynamicStyleFlags = ({element, styleFunc, flagKeys}) => {
    element[dynamicStyler] = styleFunc
    for (const [attribute, value] of Object.entries(flagKeys)) {
        const [ positiveEvent, negativeEvent ] = value
        element.addEventListener(positiveEvent, ()=>{
            element[attribute] = true
            ;(element[dynamicStyler]||nullFunc)(element)
        })
        element.addEventListener(negativeEvent, ()=>{
            element[attribute] = false
            ;(element[dynamicStyler]||nullFunc)(element)
        })
    }
}
export default addDynamicStyleFlags