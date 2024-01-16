import { css, cx } from "./css.bundle.js"

const hoverStyleHelper = ({ element, hoverStyle }) => {
    if (hoverStyle) {
        let hoverStyleAlreadyActive = false
        const helper = document.createElement("div")
        const hoverStyleAsString = `${css(hoverStyle)}`
        helper.style.cssText = hoverStyleAsString // style string values change when attached to actual elements
        const styleObject = {}
        const keys = Object.values(helper.style) // yes I know it says keys= .values() but its true
        for (const key of keys) {
            styleObject[key] = helper.style[key]
        }
        const valuesBefore = {}
        
        element.addEventListener("mouseover", ()=>{
            if (!hoverStyleAlreadyActive) {
                hoverStyleAlreadyActive = true
                for (const key of keys) {
                    valuesBefore[key] = element.style[key]
                }
                element.style.cssText += hoverStyleAsString
            }
        })

        element.addEventListener("mouseout", ()=>{
            if (hoverStyleAlreadyActive) {
                hoverStyleAlreadyActive = false
                const style = element.style
                const mixinStyleObject = {}
                for (const [key, value] of Object.entries(styleObject)) {
                    // if it wasn't changed
                    if (style[key] == value) {
                        // then restore the old value
                        mixinStyleObject[key] = valuesBefore[key]
                    }
                }
                const mixinStyles = `${css(mixinStyleObject)}`
                style.cssText += mixinStyles           // this is needed for values with !important
                Object.assign(style, mixinStyleObject) // needed for empty values 
            }
        })
    }
}
export default hoverStyleHelper