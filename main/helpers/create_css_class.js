import hash from "../generic_tools/hash.js"

export const dynamicClasses = new Set()
export const helperStyle = document.createElement("style")
export const createCssClass = (name, styles)=>{
    const classStyles = [styles].flat(Infinity)
    const key = `${name}${hash(`${classStyles}`)}`
    if (!dynamicClasses.has(key)) {
        dynamicClasses.add(key)
        for (const each of classStyles) {
            helperStyle.innerHTML += `.${key}${each}`
        }
    }
    return key
}
createCssClass.helperStyle = helperStyle
createCssClass.dynamicClasses = dynamicClasses
export default createCssClass