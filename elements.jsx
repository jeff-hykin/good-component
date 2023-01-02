/** @jsx html */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { html, css, Elemental, combineClasses } from "https://deno.land/x/elementalist@0.5.29/main/deno.js?code"
import { capitalize, indent, toCamelCase, numberToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingtoKebabCase, toScreamingtoSnakeCase, toRepresentation, toString } from "https://deno.land/x/good@0.7.8/string.js"
import { sha256 } from "https://denopkg.com/chiefbiiko/sha256@v1.0.0/mod.ts"
// emotion css (from skypack) for some reason deno can't bundle direct import: import { css, cx } from 'https://cdn.skypack.dev/@emotion/css'
export { css, cx } from 'https://cdn.skypack.dev/-/@emotion/css@v11.10.5-uWGULTiBZCR27o2j9H2P/dist=es2019,mode=imports/optimized/@emotion/css.js';
// export { default } from 'https://cdn.skypack.dev/-/@emotion/css@v11.10.5-uWGULTiBZCR27o2j9H2P/dist=es2019,mode=imports/optimized/@emotion/css.js';

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
        export function Column({ verticalAlignment, horizontalAlignment, children, ...arg }) {
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
        export function Row({ verticalAlignment, horizontalAlignment, children, ...arg }) {
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
                {arg.children}
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

    // 
    // 
    // 
    // Toast notifications
    // 
    // 
    // 
    // TODO: remove the default colors
    // TODO: allow total override of styles/elements
    // import { css, cx } from 'https://cdn.skypack.dev/@emotion/css'

    const toastOn = css``
    const toastify = css`
        padding: 12px 20px;
        color: #ffffff;
        display: inline-block;
        box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3);
        background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);
        background: linear-gradient(135deg, #73a5ff, #5477f5);
        position: fixed;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
        border-radius: 2px;
        cursor: pointer;
        text-decoration: none;
        max-width: calc(50% - 20px);
        z-index: 2147483647;
        &${toastOn} {
            opacity: 1;
        }
    `


    const toastClose = css`
        background: transparent;
        border: 0;
        color: white;
        cursor: pointer;
        font-family: inherit;
        font-size: 1em;
        opacity: 0.4;
        padding: 0 5px;
    `

    const toastifyRight = css`
        right: 15px;
        @media only screen and (max-width: 360px) {
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            max-width: fit-content;
        }
    `

    const toastifyLeft = css`
        left: 15px;
        @media only screen and (max-width: 360px) {
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            max-width: fit-content;
        }
    `

    const toastifyTop = css`
        top: -150px;
    `

    const toastifyBottom = css`
        bottom: -150px;
    `

    const toastifyRounded = css`
        border-radius: 25px;
    `

    const toastifyAvatar = css`
        width: 1.5em;
        height: 1.5em;
        margin: -7px 5px;
        border-radius: 2px;
    `

    const toastifyCenter = css`
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
        max-width: -moz-fit-content;
    `

    const nameMapping = {
        right: toastifyRight,
        left: toastifyLeft,
        top: toastifyTop,
        bottom: toastifyBottom,
        rounded: toastifyRounded,
        avatar: toastifyAvatar,
        center: toastifyCenter,
    }

    /*!
    * Toastify js 1.12.0
    * https://github.com/apvarun/toastify-js
    * @license MIT licensed
    *
    * Copyright (C) 2018 Varun A P
    */

    /**
    * Options used for Toastify
    * @typedef {Object} ToastifyConfigurationObject
    * @property {string} text - Message to be displayed in the toast
    * @property {Element} node - Provide a node to be mounted inside the toast. node takes higher precedence over text
    * @property {number} duration - Duration for which the toast should be displayed. -1 for permanent toast
    * @property {string|Element} selector - CSS ID Selector on which the toast should be added
    * @property {url} destination - URL to which the browser should be navigated on click of the toast
    * @property {boolean} newWindow - Decides whether the destination should be opened in a new window or not
    * @property {boolean} close - To show the close icon or not
    * @property {string} gravity - To show the toast from top or bottom
    * @property {string} position - To show the toast on left or right
    * @property {string} backgroundColor - Deprecated: Sets the background color of the toast
    * @property {url} avatar - Image/icon to be shown before text
    * @property {string} className - Ability to provide custom class name for further customization
    * @property {boolean} stopOnFocus - To stop timer when hovered over the toast (Only if duration is set)
    * @property {Function} callback - Invoked when the toast is dismissed
    * @property {Function} onClick - Invoked when the toast is clicked
    * @property {Object} offset - Ability to add some offset to axis
    * @property {boolean} escapeMarkup - Toggle the default behavior of escaping HTML markup
    * @property {string} ariaLive - Use the HTML DOM style property to add styles to toast
    * @property {Object} style - Use the HTML DOM style property to add styles to toast
    */

    export class Toastify {
        defaults = {
            oldestFirst: true,
            text: "Toastify is awesome!",
            node: undefined,
            duration: 3000,
            selector: undefined,
            callback: function () {},
            destination: undefined,
            newWindow: false,
            close: false,
            gravity: toastifyTop,
            positionLeft: false,
            position: "",
            backgroundColor: "",
            avatar: "",
            className: "",
            stopOnFocus: true,
            onClick: function () {},
            offset: { x: 0, y: 0 },
            escapeMarkup: true,
            ariaLive: "polite",
            style: { background: "" },
        }
        
        /**
        * Init the Toastify class
        * @example
        *     Toastify({
        *         text: "This is a toast",
        *         duration: 3000
        *     }).showToast()
        *
        * @param {ToastifyConfigurationObject} options - The configuration object to configure Toastify
        * @param {string} [options.text=Hi there!] - Message to be displayed in the toast
        * @param {Element} [options.node] - Provide a node to be mounted inside the toast. node takes higher precedence over text
        * @param {number} [options.duration=3000] - Duration for which the toast should be displayed. -1 for permanent toast
        * @param {string} [options.selector] - CSS Selector on which the toast should be added
        * @param {url} [options.destination] - URL to which the browser should be navigated on click of the toast
        * @param {boolean} [options.newWindow=false] - Decides whether the destination should be opened in a new window or not
        * @param {boolean} [options.close=false] - To show the close icon or not
        * @param {string} [options.gravity=toastify-top] - To show the toast from top or bottom
        * @param {string} [options.position=right] - To show the toast on left or right
        * @param {string} [options.backgroundColor] - Sets the background color of the toast (To be deprecated)
        * @param {url} [options.avatar] - Image/icon to be shown before text
        * @param {string} [options.className] - Ability to provide custom class name for further customization
        * @param {boolean} [options.stopOnFocus] - To stop timer when hovered over the toast (Only if duration is set)
        * @param {Function} [options.callback] - Invoked when the toast is dismissed
        * @param {Function} [options.onClick] - Invoked when the toast is clicked
        * @param {Object} [options.offset] - Ability to add some offset to axis
        * @param {boolean} [options.escapeMarkup=true] - Toggle the default behavior of escaping HTML markup
        * @param {string} [options.ariaLive] - Announce the toast to screen readers
        * @param {Object} [options.style] - Use the HTML DOM style property to add styles to toast
        */
        constructor(options) {
            /**
            * The version of Toastify
            * @type {string}
            * @public
            */
            this.version = "1.12.0"

            /**
            * The configuration object to configure Toastify
            * @type {ToastifyConfigurationObject}
            * @public
            */
            this.options = {}

            /**
            * The element that is the Toast
            * @type {Element}
            * @public
            */
            this.toastElement = null

            /**
            * The root element that contains all the toasts
            * @type {Element}
            * @private
            */
            this._rootElement = document.body

            // Setting defaults
            this.options = Object.assign(this.defaults, options)

            if (this.options.backgroundColor) {
                // This is being deprecated in favor of using the style HTML DOM property
                console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.')
            }

            this.toastElement = null

            this.options.gravity = options.gravity === "bottom" ? toastifyBottom : toastifyTop // toast position - top or bottom
            this.options.stopOnFocus = options.stopOnFocus === undefined ? true : options.stopOnFocus // stop timeout on focus
            if (options.backgroundColor) {
                this.options.style.background = options.backgroundColor
            }
        }

        /**
        * Display the toast
        * @public
        */
        showToast() {
            // Creating the DOM object for the toast
            this.toastElement = this._buildToast()

            // Getting the root element to with the toast needs to be added
            if (typeof this.options.selector === "string") {
                this._rootElement = document.getElementById(this.options.selector)
            } else if (this.options.selector instanceof HTMLElement || this.options.selector instanceof ShadowRoot) {
                this._rootElement = this.options.selector
            } else {
                this._rootElement = document.body
            }

            // Validating if root element is present in DOM
            if (!this._rootElement) {
                throw "Root element is not defined"
            }

            // Adding the DOM element
            this._rootElement.insertBefore(this.toastElement, this._rootElement.firstChild)

            // Repositioning the toasts in case multiple toasts are present
            this._reposition()

            if (this.options.duration > 0) {
                this.toastElement.timeOutValue = window.setTimeout(() => {
                    // Remove the toast from DOM
                    this._removeElement(this.toastElement)
                }, this.options.duration) // Binding `this` for function invocation
            }

            // Supporting function chaining
            return this
        }

        /**
        * Hide the toast
        * @public
        */
        hideToast() {
            if (this.toastElement.timeOutValue) {
                clearTimeout(this.toastElement.timeOutValue)
            }
            this._removeElement(this.toastElement)
        }

        /**
        * Build the Toastify element
        * @returns {Element}
        * @private
        */
        _buildToast() {
            // Validating if the options are defined
            if (!this.options) {
                throw "Toastify is not initialized"
            }

            // Creating the DOM object
            let divElement = document.createElement("div")
            divElement.className = `${toastify} ${toastOn} ${this.options.className}`

            // Positioning toast to left or right or center (default right)
            divElement.className += ` ${nameMapping[this.options.position]}`

            // Assigning gravity of element
            divElement.className += ` ${this.options.gravity}`

            // Loop through our style object and apply styles to divElement
            for (const property in this.options.style) {
                divElement.style[property] = this.options.style[property]
            }

            // Announce the toast to screen readers
            if (this.options.ariaLive) {
                divElement.setAttribute("aria-live", this.options.ariaLive)
            }

            // Adding the toast message/node
            if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
                // If we have a valid node, we insert it
                divElement.appendChild(this.options.node)
            } else {
                if (this.options.escapeMarkup) {
                    divElement.innerText = this.options.text
                } else {
                    divElement.innerHTML = this.options.text
                }

                if (this.options.avatar !== "") {
                    let avatarElement = document.createElement("img")
                    avatarElement.src = this.options.avatar

                    avatarElement.className = toastifyAvatar

                    if (this.options.position == "left") {
                        // Adding close icon on the left of content
                        divElement.appendChild(avatarElement)
                    } else {
                        // Adding close icon on the right of content
                        divElement.insertAdjacentElement("afterbegin", avatarElement)
                    }
                }
            }

            // Adding a close icon to the toast
            if (this.options.close === true) {
                // Create a span for close element
                let closeElement = document.createElement("button")
                closeElement.type = "button"
                closeElement.setAttribute("aria-label", "Close")
                closeElement.className = toastClose
                closeElement.innerHTML = "&#10006;"

                // Triggering the removal of toast from DOM on close click
                closeElement.addEventListener("click", (event) => {
                    event.stopPropagation()
                    this._removeElement(this.toastElement)
                    window.clearTimeout(this.toastElement.timeOutValue)
                })

                //Calculating screen width
                const width = window.innerWidth > 0 ? window.innerWidth : screen.width

                // Adding the close icon to the toast element
                // Display on the right if screen width is less than or equal to 360px
                if (this.options.position == "left" && width > 360) {
                    // Adding close icon on the left of content
                    divElement.insertAdjacentElement("afterbegin", closeElement)
                } else {
                    // Adding close icon on the right of content
                    divElement.appendChild(closeElement)
                }
            }

            // Clear timeout while toast is focused
            if (this.options.stopOnFocus && this.options.duration > 0) {
                // stop countdown
                divElement.addEventListener("mouseover", (event) => {
                    window.clearTimeout(divElement.timeOutValue)
                })
                // add back the timeout
                divElement.addEventListener("mouseleave", () => {
                    divElement.timeOutValue = window.setTimeout(() => {
                        // Remove the toast from DOM
                        this._removeElement(divElement)
                    }, this.options.duration)
                })
            }

            // Adding an on-click destination path
            if (typeof this.options.destination !== "undefined") {
                divElement.addEventListener("click", (event) => {
                    event.stopPropagation()
                    if (this.options.newWindow === true) {
                        window.open(this.options.destination, "_blank")
                    } else {
                        window.location = this.options.destination
                    }
                })
            }

            if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
                divElement.addEventListener("click", (event) => {
                    event.stopPropagation()
                    this.options.onClick()
                })
            }

            // Adding offset
            if (typeof this.options.offset === "object") {
                const x = this._getAxisOffsetAValue("x", this.options)
                const y = this._getAxisOffsetAValue("y", this.options)

                const xOffset = this.options.position == "left" ? x : `-${x}`
                const yOffset = this.options.gravity == toastifyTop ? y : `-${y}`

                divElement.style.transform = `translate(${xOffset},${yOffset})`
            }

            // Returning the generated element
            return divElement
        }

        /**
        * Remove the toast from the DOM
        * @param {Element} toastElement
        */
        _removeElement(toastElement) {
            // Hiding the element
            toastElement.className = toastElement.className.replace(` ${toastOn}`, "")

            // Removing the element from DOM after transition end
            window.setTimeout(() => {
                // remove options node if any
                if (this.options.node && this.options.node.parentNode) {
                    this.options.node.parentNode.removeChild(this.options.node)
                }

                // Remove the element from the DOM, only when the parent node was not removed before.
                if (toastElement.parentNode) {
                    toastElement.parentNode.removeChild(toastElement)
                }

                // Calling the callback function
                this.options.callback.call(toastElement)

                // Repositioning the toasts again
                this._reposition()
            }, 400) // Binding `this` for function invocation
        }

        /**
        * Position the toast on the DOM
        * @private
        */
        _reposition() {
            // Top margins with gravity
            let topLeftOffsetSize = {
                top: 15,
                bottom: 15,
            }
            let topRightOffsetSize = {
                top: 15,
                bottom: 15,
            }
            let offsetSize = {
                top: 15,
                bottom: 15,
            }

            // Get all toast messages that have been added to the container (selector)
            let allToasts = this._rootElement.querySelectorAll(`.${toastify}`)

            let classUsed

            // Modifying the position of each toast element
            for (let i = 0; i < allToasts.length; i++) {
                // Getting the applied gravity
                if (allToasts[i].classList.contains(toastifyTop) === true) {
                    classUsed = toastifyTop
                } else {
                    classUsed = toastifyBottom
                }

                let height = allToasts[i].offsetHeight
                classUsed = classUsed.substr(9, classUsed.length - 1)
                // Spacing between toasts
                let offset = 15

                let width = window.innerWidth > 0 ? window.innerWidth : screen.width

                // Show toast in center if screen with less than or equal to 360px
                if (width <= 360) {
                    // Setting the position
                    allToasts[i].style[classUsed] = `${offsetSize[classUsed]}px`

                    offsetSize[classUsed] += height + offset
                } else {
                    if (allToasts[i].classList.contains(toastifyLeft) === true) {
                        // Setting the position
                        allToasts[i].style[classUsed] = `${topLeftOffsetSize[classUsed]}px`

                        topLeftOffsetSize[classUsed] += height + offset
                    } else {
                        // Setting the position
                        allToasts[i].style[classUsed] = `${topRightOffsetSize[classUsed]}px`

                        topRightOffsetSize[classUsed] += height + offset
                    }
                }
            }
        }

        /**
        * Helper function to get offset
        * @param {string} axis - 'x' or 'y'
        * @param {ToastifyConfigurationObject} options - The options object containing the offset object
        */
        _getAxisOffsetAValue(axis, options) {
            if (options.offset[axis]) {
                if (isNaN(options.offset[axis])) {
                    return options.offset[axis]
                } else {
                    return `${options.offset[axis]}px`
                }
            }

            return "0px"
        }
    }