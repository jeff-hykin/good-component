export const translateAlignment = (name) => {
    if (name == "top" || name == "left") {
        return "flex-start"
    } else if (name == "bottom" || name == "right") {
        return "flex-end"
    } else {
        return name
    }
}