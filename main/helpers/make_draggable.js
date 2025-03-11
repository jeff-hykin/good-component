export function makeDraggable(element, {onDrag=({isStart, isEnd, x, y})=>{}, itsPositionedCorrectlyIPromise=false}={}) {
    if (!itsPositionedCorrectlyIPromise) {
        const computedStyle = window.getComputedStyle(element)
        const positioning = computedStyle.getPropertyValue("position") 
        if (positioning != "absolute" && positioning != "relative" && positioning != "fixed") {
            throw Error(`[from makeDraggable] Element ${element} is does not have a style.position that is absolute, relative, or fixed. It is positioned ${positioning}.`)
        }
    }

    // NOTE: this function might not be perfect
    // - (mousing outside of window/element)
    // - using fixed or relative instead of absolute, or even absolute thats not top level
    let isDragging = false
    let offsetX, offsetY

    element.addEventListener("mousedown", (e) => {
        isDragging = true

        // Get the mouse position relative to the top-left corner of the div
        const left = element.getBoundingClientRect().left
        const top = element.getBoundingClientRect().top
        offsetX = e.clientX - left
        offsetY = e.clientY - top

        // Change the cursor style when dragging
        element.style.cursor = "grabbing"
        onDrag({isStart: true, isEnd: false, x: e.clientX, y: e.clientY})
    })

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {

            // Calculate the new position of the div based on the mouse position
            const x = e.clientX - offsetX
            const y = e.clientY - offsetY

            // Set the new position of the div
            element.style.left = `${x}px`
            element.style.top = `${y}px`
            onDrag({isStart: false, isEnd: false, x: e.clientX, y: e.clientY})
        }
    })

    document.addEventListener("mouseup", (e) => {
        // Stop dragging when mouse is released
        isDragging = false
        element.style.cursor = "pointer"
        if (isDragging) {
            onDrag({isStart: false, isEnd: true, x: e.clientX, y: e.clientY})
        }
    })
}