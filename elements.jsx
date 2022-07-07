/** @jsx html */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { html, css, Elemental } from "https://raw.githubusercontent.com/jeff-hykin/elemental/f9764dd95cb0e645e1dffbe369b7a6467d2e77e3/main/deno.js"
import { capitalize, indent, toCamelCase, numberToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingtoKebabCase, toScreamingtoSnakeCase, toRepresentation, toString } from "https://deno.land/x/good@0.5.15/string.js"

window.Elemental = Elemental // for debugging only

const randomId = Elemental.randomId

const translateAlignment = (name) => {
    if (name == "top" || name == "left") {
        return "flex-start"
    } else if (name == "bottom" || name == "right") {
        return "flex-end"
    } else {
        return name
    }
}

const classIds = {
    column: randomId(`column`),
    row: randomId(`row`),
}

document.body.appendChild(<style>{`
    .${classIds.column} {
        display: flex;
        flex-direction: column;
    }
    .${classIds.row} {
        display: flex;
        flex-direction: row;
    }
`}</style>)


export const Column = ({ children, style, center=false, verticalAlignment=null, horizontalAlignment=null, ...otherArgs }) => {
    if (center) {
        verticalAlignment = verticalAlignment || "center"
        horizontalAlignment = horizontalAlignment || "center"
    } else {
        verticalAlignment = verticalAlignment || "top"
        horizontalAlignment = horizontalAlignment || "left"
    }
    return <div
        class={Elemental.combineClasses(classIds.column, otherArgs.class)}
        style={`justify-content: ${translateAlignment(verticalAlignment)}; align-items: ${translateAlignment(horizontalAlignment)}; text-align: ${horizontalAlignment}; ${css(style)}; ${css(otherArgs)};`}
        {...otherArgs}
        >
            {children}
    </div>
}

export const Row = ({ children, style, center=false, verticalAlignment=null, horizontalAlignment=null, ...otherArgs }) => {
    if (center) {
        verticalAlignment = verticalAlignment || "center"
        horizontalAlignment = horizontalAlignment || "center"
    } else {
        verticalAlignment = verticalAlignment || "top"
        horizontalAlignment = horizontalAlignment || "left"
    }
    return <div
        class={Elemental.combineClasses(classIds.row, otherArgs.class)}
        style={`justify-content: ${translateAlignment(horizontalAlignment)}; align-items: ${translateAlignment(verticalAlignment)}; text-align: ${horizontalAlignment}; ${css(style)}; ${css(otherArgs)};`}
        {...otherArgs}
        >
            {children}
    </div>
}

export const Input = ({ children, style, ...otherArgs }) => {
    return <input
        class={otherArgs.class}
        style={`${css(style)}; ${css(otherArgs)};`}
        {...otherArgs}
        />
}

export const askForFiles = async ()=>{
    return new Promise((resolve, reject)=>{
        const cleanResolve = (returnValue)=>{
            resolve(returnValue)
            window.removeEventListener("focus", listener)
            document.body.removeChild(filePicker)
        }
        const listener = ()=>cleanResolve([])
        window.addEventListener("focus", listener)
        let filePicker = <input
            type="file"
            onInput={event=>{ cleanResolve(event.target.files) }}
            onBlur={event=>{ cleanResolve([]) }}
            hidden
            />
        document.body.appendChild(filePicker)
        filePicker.click()
    })
}
window.askForFiles = askForFiles