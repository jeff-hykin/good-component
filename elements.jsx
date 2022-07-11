/** @jsx html */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { html, css, Elemental } from "https://raw.githubusercontent.com/jeff-hykin/elemental/f9764dd95cb0e645e1dffbe369b7a6467d2e77e3/main/deno.js"
import { capitalize, indent, toCamelCase, numberToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingtoKebabCase, toScreamingtoSnakeCase, toRepresentation, toString } from "https://deno.land/x/good@0.5.15/string.js"

// roadmap of tools:
    // Code
    // Collaspable
    // NestedMenus
    // inputs:
        // Button
        // Dropdown
        // Search
            // MultiSelect
            // SingleSelect
        // ExpandingTextbox
        // Checkbox
        // PickOne
        // PickMany
        // Number
        // Slider
        // DatePicker
        // TimePicker
        // DateTimePicker
        // PhoneNumber
        // Email
        // Address
    // outputs:
        // Toast
        // Popover
        // Chip
        // LoadingSpinner
            // progress option
        // Tabs
    // Video
        // mp4/avi source link
    

window.Elemental = Elemental // for debugging only

const randomId = Elemental.randomId
const combineClasses = Elemental.combineClasses

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
    popUp: randomId(`popUp`),
    button: randomId(`button`),
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
    .${classIds.popUp} {
        align-items: center;
        justify-content: center;
        position: absolute;
        top:0;
        left: 0;
        z-index: 5000;
        display: flex;
        width: 100vw;
        height: 100vh;
    }
    .${classIds.button} {
        background: whitesmoke;
        box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
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
        class={combineClasses(classIds.column, otherArgs.class)}
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
        class={combineClasses(classIds.row, otherArgs.class)}
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

export const Button = ({ children, style, ...otherArgs }) => {
    return <button
        class={combineClasses(classIds.button, otherArgs.class)}
        style={`${css(style)}; ${css(otherArgs)};`}
        {...otherArgs}
        />
}

export const popUp = async ({ children, style, center, ...otherArgs })=>{
    const container = <div
        class={combineClasses(classIds.popUp, otherArgs.class)}
        onClick={event=>{
            // if actually clicked the container itself
            if (event.target == container) {
                // close the popUp
                container.remove()
            }
        }}
        >
            <Column verticalAlignment="top" horizontalAlignment="center" style="width: fit-content; height: 50vh; overflow-y: auto;">
                {children}
            </Column>
    </div>
    document.body.prepend(container)
    return container
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