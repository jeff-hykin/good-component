// 
// create helper element for styles and such
// 
export const helperElement = document.createElement("div")
helperElement.setAttribute("note", "STUFF WILL BREAK IF YOU DELETE ME")
helperElement.setAttribute("style", "position: fixed; top: 0; left: 0;")
window.addEventListener("load", ()=>document.body.prepend(helperElement))