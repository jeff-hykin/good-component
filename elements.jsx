/** @jsx html */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { html, css, Elemental, combineClasses } from "https://deno.land/x/elementalist@0.5.19/main/deno.js?code"
import { capitalize, indent, toCamelCase, numberToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingtoKebabCase, toScreamingtoSnakeCase, toRepresentation, toString } from "https://deno.land/x/good@0.5.15/string.js"
import { sha256 } from "https://denopkg.com/chiefbiiko/sha256@v1.0.0/mod.ts"
const hash = (value)=>sha256(value, 'utf-8', 'hex')

// roadmap of tools:
    // done: Code
    // systems:
        // Collaspable (using client height)
        // PopOver (attach listeners to an element)
        // ContextMenu (global element that shows in the right place)
        // consider scroll-fix system
        // ZoomPanScroll control
    // outputs:
        // Toast
    // inputs:
        // done: Input
        // done: Button
        // done: Checkbox
        // Dropdown
        // ExpandingTextbox
        // Number
        // Slider
        // PhoneNumber
        // Email
    // Image (format, from hex, url)
    // Table (rows or columns format, using getters)
// beyond scope:
    // SwiperChoice
    // Form (input validity)
    // inputs:
        // PickOne
        // PickMany
        // DatePicker
        // TimePicker
        // DateTimePicker
        // Search
            // MultiSelect
            // SingleSelect
        // Address
    // outputs:
        // Tabs
        // Chip
        // LoadingSpinner
            // progress option
    // systems:
        // ContextMenuHelper (list options, attach callbacks)
        // NestedMenus
    // Video
        // mp4/avi source link


window.Elemental = Elemental // for debugging only

// 
// 
// Helpers
// 
// 


    // 
    // create helper element for styles and such
    // 
    const helperElement = document.createElement("div")
    helperElement.setAttribute("note", "STUFF WILL BREAK IF YOU DELETE ME")
    helperElement.setAttribute("style", "position: fixed; top: 0; left: 0;")
    window.addEventListener("load", ()=>document.body.prepend(helperElement))
    const helperStyle = document.createElement("style")
    const setupStyles = (arg, styles)=>{
        if (arg.styles) {
            arg.styles = `${styles};${css(arg.styles)};`
        } else {
            arg.styles = styles
        }
        return arg
    }

    const dynamicClasses = new Set()
    const createCssClass = (name, styles)=>{
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
    const setupClassStyles = (arg)=>{
        if (arg.classStyles) {
            const className = createCssClass(``,arg.classStyles)
            arg.class = combineClasses(className, arg.class)
        }
        return arg
    }


    const translateAlignment = (name) => {
        if (name == "top" || name == "left") {
            return "flex-start"
        } else if (name == "bottom" || name == "right") {
            return "flex-end"
        } else {
            return name
        }
    }

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



// 
// 
// 
// Components
// 
// 
// 
    // 
    // Column
    // 
        const columnClass = createCssClass(`column`, [
            `{
                display: flex;
                flex-direction: column;
                transition: all 0.4s ease-in-out 0s;
            }`
        ])
        export function Column({ verticalAlignment, horizontalAlignment, ...arg }) {
            // 
            // class
            // 
            arg       = setupClassStyles(arg)
            arg.class = combineClasses(columnClass, arg.class)
            
            // 
            // style
            // 
            const justify = translateAlignment(verticalAlignment || "top")
            const align = translateAlignment(horizontalAlignment || "left")
            const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment // css is a special breed of inconsistent
            arg = setupStyles(arg, `
                justify-content: ${justify};
                align-items: ${align};
                text-align: ${horizontalAlignment};
                vertical-align: ${verticalText};
            `)

            // 
            // element
            // 
            return <div {...arg}>
                {children}
            </div>
        }

    // 
    // row
    // 
        const rowClass = createCssClass(`row`, [
            `{
                display: flex;
                flex-direction: row;
                transition: all 0.4s ease-in-out 0s;
            }`
        ])
        export function Row({ verticalAlignment, horizontalAlignment, ...arg }) {
            // 
            // class
            // 
            arg       = setupClassStyles(arg)
            arg.class = combineClasses(rowClass, arg.class)
            
            // 
            // style
            // 
            const justify = translateAlignment(horizontalAlignment || "left")
            const align = translateAlignment(verticalAlignment || "top")
            const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment // css is a special breed of inconsistent
            arg = setupStyles(arg, `
                justify-content: ${justify};
                align-items: ${align};
                text-align: ${horizontalAlignment};
                vertical-align: ${verticalText};
            `)

            // 
            // element
            // 
            return <div {...arg}>
                {children}
            </div>
        }
    
    // 
    // Code
    // 
        const codeClass = createCssClass(`code`, [ // these mostly exist to create similar behavior across browsers 
            `{
                white-space: pre;
                font-family: monospace, monospace;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
                margin: 0;
                padding: 0;
                border: 0;
            }`,
        ])
        export function Code(arg) {
            // 
            // class
            // 
            arg       = setupClassStyles(arg)
            arg.class = combineClasses(codeClass, arg.class)
            
            // 
            // element
            // 
            return <code {...arg}>
                {children}
            </code>
        }

    // 
    // Input
    // 
        const inputClass = createCssClass(`input`, [ // these merely exist to create similar behavior across browsers 
            `{
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                overflow: visible;
            }`,
            `[type=date]           { -webkit-appearance: listbox; }`,
            `[type=time]           { -webkit-appearance: listbox; }`,
            `[type=datetime-local] { -webkit-appearance: listbox; }`,
            `[type=month]          { -webkit-appearance: listbox; }`,
        ])
        export function Input(arg) {
            // 
            // class
            // 
            arg       = setupClassStyles(arg)
            arg.class = combineClasses(inputClass, arg.class)
            
            // 
            // element
            // 
            return <input {...arg} />
        }
    
    // 
    // Button
    // 
        const buttonClass = createCssClass(`button`, [ // these merely exist to create similar behavior across browsers 
            `{
                border-radius: 0;
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                -webkit-appearance: button;
                overflow: visible;
                text-transform: none;
            }`,
            `::-moz-focus-inner   { border-style: none; padding: 0;}`,
        ])
        export function Button(arg) {
            // 
            // class
            // 
            arg       = setupClassStyles(arg)
            arg.class = combineClasses(buttonClass, arg.class)
            
            // 
            // element
            // 
            return <button {...arg}>
                {children}
            </button>
        }
    
    // 
    // Checkbox
    // 
        const checkboxClass = createCssClass(`checkbox`, [ // these merely exist to create similar behavior across browsers 
            `{
                box-sizing: border-box;
                padding: 0;
            }`,
        ])
        export function Checkbox(arg) {
            // 
            // class
            // 
            arg       = setupClassStyles(arg)
            arg.class = combineClasses(inputClass, checkboxClass, arg.class)
            
            // 
            // element
            // 
            const element = <input type="checkbox" {...arg} />

            // 
            // treat value the same as checked (although checked overrides value if both are given)
            // 
            Object.defineProperties(element, {
                value: {
                    get() { this.checked },
                    set(value) { this.checked = value },
                } 
            })
            const propNames = Object.keys(arg)
            if (!propNames.includes("checked") && propNames.includes("value")) {
                element.checked = arg.value
            } else {
                element.checked = arg.checked
            }

            return element
        }
    
    // 
    // Dropdown
    // 
        const originalDisplayValueSymbol = Symbol("originalDisplayValue")
        const dropdownPlaceholder = createCssClass(`dropdownPlaceholder`, [ // these merely exist to create similar behavior across browsers 
            `{
                overflow: visible;
            }`,
        ])
        const dropdownList = createCssClass(`dropdownList`, [ // these merely exist to create similar behavior across browsers 
            `{
                overflow: auto;
                height: fit-content;
                max-height: 50vh;
            }`,
        ])
        export function Dropdown({ children, ...arg}) {
            // 
            // class
            // 
            arg       = setupClassStyles(arg)
            arg.class = combineClasses(dropdownList, arg.class)
            
            // 
            // elements
            // 
            const placeholder = <Column class={dropdownPlaceholder} />
            const listOfOptions = <Column class={dropdownList} {...arg}>
                {children}
            </Column>
            // init the display values
            for (const each of listOfOptions.children) {
                each[originalDisplayValueSymbol] = each.style.display
            }

            // 
            // events
            // 
            const onMainClickOrInput = (event)=> {
                // get the current dimensions to make a placeholder
                placeholder.style.minHeight = `${listOfOptions.clientHeight}px`
                placeholder.style.maxHeight = `${listOfOptions.clientHeight}px`
                placeholder.style.minWidth = `${listOfOptions.clientWidth}px`
                placeholder.style.maxWidth = `${listOfOptions.clientWidth}px`
                // nest them
                const parent = listOfOptions.parentNode
                parent.replaceChild(placeholder, listOfOptions)
                placeholder.appendChild(listOfOptions)

                // show all the options instead of only the selected one
                for (const each of listOfOptions.children) {
                    each.style.display = each[originalDisplayValueSymbol]
                }
            }
            const onOptionClickOrInput = (event)=> {
                placeholder.selected = event.target
                
                // hide all non-selected options
                for (const each of listOfOptions.children) {
                    each[originalDisplayValueSymbol] = each.style.display
                    // hide all the non selected values
                    if (each != element.selected) {
                        each.style.display = "none"
                    }
                }

                // remove the placeholder
                const parent = placeholder?.parentNode
                if (parent?.replaceChild) {
                    parent.replaceChild(listOfOptions, placeholder)
                }
            }
            
            // attach listeners
            listOfOptions.addEventListener("click", onMainClickOrInput)
            listOfOptions.addEventListener("input", onMainClickOrInput)
            for (const each of listOfOptions.children) {
                each.addEventListener("click", onOptionClickOrInput)
                each.addEventListener("input", onOptionClickOrInput)
            }

            //
            // handle default value, hides list of options
            //
            onOptionClickOrInput({target: args.default})

            return listOfOptions
        }
// 
// 
// 
// Actions
// 
// 
// 
    export const askForFiles = async ()=>{
        return new Promise((resolve, reject)=>{
            const cleanResolve = (returnValue)=>{
                resolve(returnValue)
                window.removeEventListener("focus", listener)
                try {
                    helperElement.removeChild(filePicker)
                } catch (error) {
                    
                }
            }
            const listener = ()=>cleanResolve([])
            window.addEventListener("focus", listener)
            let filePicker = <input
                type="file"
                onInput={event=>{ cleanResolve(event.target.files) }}
                onBlur={event=>{ cleanResolve([]) }}
                hidden
                />
            helperElement.appendChild(filePicker)
            filePicker.click()
        })
    }

    export const popUp = async ({ children, ...otherArgs })=>{
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
        helperElement.prepend(container)
        return container
    }