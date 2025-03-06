export function makeDraggable(element, {onDragStart, itsPositionedCorrectlyIPromise }={}) {
    if (!itsPositionedCorrectlyIPromise) {
        const computedStyle = window.getComputedStyle(element)
        const positioning = computedStyle.position
        if (positioning != "absolute" && positioning != "relative" && positioning != "fixed") {
            throw Error(`[from makeDraggable] Element ${element} is does not have a style.position that is absolute, relative, or fixed. It is positioned ${positioning}.`)
        }
    }

    // NOTE: this function might not be perfect (mousing outside of window/element)
    let isDragging = false
    let offsetX, offsetY

    element.addEventListener("mousedown", (e) => {
        onDragStart&&onDragStart(e)
        isDragging = true

        // Get the mouse position relative to the top-left corner of the div
        offsetX = e.clientX - element.getBoundingClientRect().left
        offsetY = e.clientY - element.getBoundingClientRect().top

        // Change the cursor style when dragging
        element.style.cursor = "grabbing"
    })

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            // Calculate the new position of the div based on the mouse position
            const x = e.clientX - offsetX
            const y = e.clientY - offsetY

            // Set the new position of the div
            element.style.left = `${x}px`
            element.style.top = `${y}px`
        }
    })

    document.addEventListener("mouseup", () => {
        // Stop dragging when mouse is released
        isDragging = false
        element.style.cursor = "pointer"
    })
}