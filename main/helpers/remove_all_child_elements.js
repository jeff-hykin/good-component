function removeAllChildElements(parentElement) {
    if (parentElement) {
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }
}
export default removeAllChildElements