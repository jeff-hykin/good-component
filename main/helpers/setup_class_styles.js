import createCssClass from "./create_css_class.js"
import combineClasses from "./combine_classes.js"

const setupClassStyles = (arg)=>{
    if (arg.classStyles) {
        const className = createCssClass(``,arg.classStyles)
        arg.class = combineClasses(className, arg.class)
    }
    return arg
}
export default setupClassStyles