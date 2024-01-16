const combineClasses = (...classes) => {
    classes = classes.filter(each=>each!=null)
    let classesFinalList = []
    for (let eachEntry of classes) {
        // handle strings
        if (typeof eachEntry == 'string') {
            eachEntry = eachEntry.split(" ")
        }
        // handle lists
        if (eachEntry instanceof Array) {
            eachEntry = eachEntry.flat(Infinity)
            for (let eachName of eachEntry) {
                classesFinalList.push(eachName)
            }
        // handle objects
        } else if (eachEntry instanceof Object) {
            for (const [className, enabled] of Object.entries(eachEntry)) {
                if (enabled) {
                    classesFinalList.push(className)
                }
            }
        }
    }
    return classesFinalList
}
export default combineClasses