import showdown from "https://esm.sh/showdown@2.1.0"
const markdownConverter = new showdown.Converter()

/**
 * Markdown
 *
 * @example
 *     html`<Markdown text=${`
 *         # Works
 *         **as intended**
 *     `} />`
 *
 * @param arg1.text - string
 */
const Markdown = ({ text })=>{
    const element = document.createElement("div")
    const indent = text.match(/\t* *\n( *)/)[1]
    // remove the initial indent
    text = text.replace(regex`${/^/}${indent}`.gm, "")
    element.innerHTML = markdownConverter.makeHtml(text)
    return element
}
export default Markdown