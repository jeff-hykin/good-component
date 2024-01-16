import { sha256 } from "https://denopkg.com/chiefbiiko/sha256@v1.0.0/mod.ts"
const hash = (value)=>sha256(value, 'utf-8', 'hex')

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