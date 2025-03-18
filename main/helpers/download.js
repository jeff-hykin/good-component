export default function download(filename, textOrBlob) {
    const element = document.createElement('a')
    let url
    if (typeof textOrBlob == "string") {
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(textOrBlob))
    } else {
        url = URL.createObjectURL(textOrBlob)
        element.href = url
    }
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    url && URL.revokeObjectURL(url)
}