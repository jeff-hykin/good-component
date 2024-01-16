const kebabCase = (string)=>string.replace(/[a-z]([A-Z])(?=[a-z])/g, (each)=>`${each[0]}-${each.slice(1).toLowerCase()}`)
function mergeStyles(element, style) {
    if (style) {
        const helper = document.createElement("div")
        if (typeof style != "string" && style instanceof Object) {
            let finalString = ""
            for (const [key, value] of Object.entries(style)) {
                if (value != null) {
                    finalString += `${kebabCase(key)}: ${value};`
                }
            }
            style = finalString
        }
        if (typeof style == 'string') {
            helper.style.setAttribute("style", style)
        }
        const theyreActuallyKeys = Object.values(helper.style) 
        for (const key of theyreActuallyKeys) {
            element.style[key] = helper.style[key]
        }
    }
}
export default mergeStyles