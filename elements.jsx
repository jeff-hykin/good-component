/** @jsx html */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { html } from "./main/imports.js"
import { css, cx } from "./main/helpers/css.bundle.js"
export { css as css, cx as cx}

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


// 
// 
// Helpers
// 
// 


    // 
    // create helper element for styles and such
    // 
    import { helperElement } from "./main/helpers/helper_element.js"
    import { translateAlignment } from "./main/helpers/translate_alignment.js"
    import { setupStyles, createCssClass, setupClassStyles, hoverStyleHelper, combineClasses, mergeStyles } from "./main/helpers.js"
    import { Column } from "./main/components/column.js" 
    import { Row } from "./main/components/row.js"
    import { Button } from "./main/components/button.js"
    export { Column, Row, Button }
// 
// 
// 
// Components
// 
// 
// 
    // 
    // Code
    // 
        const codeClass = css`
            white-space: pre;
            font-family: monospace, monospace;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
            margin: 0;
            padding: 0;
            border: 0;
        `
        export function Code({children, ...arg}) {
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
        const inputClass = css`
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            overflow: visible;
        `
        // TODO:
        // createCssClass(`input`, [ // these merely exist to create similar behavior across browsers 
        //     `[type=date]           { -webkit-appearance: listbox; }`,
        //     `[type=time]           { -webkit-appearance: listbox; }`,
        //     `[type=datetime-local] { -webkit-appearance: listbox; }`,
        //     `[type=month]          { -webkit-appearance: listbox; }`,
        // ])
        export function Input(arg) {
            // 
            // class
            // 
            arg       = setupClassStyles(arg)
            arg.class = combineClasses(inputClass, arg.class)
            arg = setupStyles(arg, `
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                overflow: visible;
            `)
            
            // 
            // element
            // 
            return <input {...arg} />
        }
    
    // 
    // Checkbox
    // 
        const checkboxClass = css`
            box-sizing: border-box;
            padding: 0;
        `
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
        const dropdownPlaceholder = css`
            overflow: visible;
        `
        const dropdownList = css`
            overflow: auto;
            height: fit-content;
            max-height: 50vh;
        `
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
        
        import { Markdown } from "./main/components.js"
        
        // all components
        export const components = {
            Column,
            Row,
            Code,
            Input,
            Button,
            Checkbox,
            Dropdown,
            Markdown,
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
            let value = null
            let waitValue
            let hasResolved = false
            const cleanResolve = (returnValue)=>{
                value = returnValue
                if (hasResolved) {
                    return
                }
                if (!waitValue && returnValue.length == 0){
                    waitValue = setTimeout(()=>{
                        if (!hasResolved) {
                            hasResolved = true
                            resolve(value)
                        }
                    }, 200)
                } else {
                    clearTimeout(waitValue)
                    hasResolved = true
                    resolve(value)
                }
                
                try {
                    window.removeEventListener("focus", listener)
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

    // 
    // 
    // 
    // Toast notifications
    // 
    // 
    // 
    export { Toastify, showToast } from "./main/actions/show_toast.js"