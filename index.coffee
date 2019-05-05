Vue = require("vue").default
require "good-jsx"

if typeof window == undefined
    window = {}

# 
# override the build in appendChild so that it renders Vue components as elements
# 
originalAppendChild = window.HTMLElement.prototype.appendChild
window.HTMLElement.prototype.appendChild = (element) -> 
    if element instanceof Node
        originalAppendChild.apply(this, [element])
    else if element.$element instanceof Node
        originalAppendChild.apply(this, [element.$element])
    else if element.$mount instanceof Function
        element.$mount()
        originalAppendChild.apply(this, [element.$element])
    else
        originalAppendChild.apply(this, [element])

# Convert Vue components into their HTML Nodes when they are JSX
window.jsxChain.push (key, properties, ...children) -> 
    if key instanceof Function
        # if it has a constructor
        if !!key.prototype && !!key.prototype.constructor.name
            newElement = new key({...properties, children})
            if newElement._isMounted == false
                newElement.$mount()
                return newElement.$element
            return newElement
        else
            return key({...properties, children: children})

module.exports = (obj) -> 
    obj.render = (h, ...args) ->
        # the first time the component is rendered
        if !this._isMounted
            # evaluate each of the props
            # otherwise when they are changed, the update function will never be called
            # (because of Vue.js magic/optimizations that I don't fully understand)
            for each of obj.props
                this[each]
            this.$element = obj.dom.apply(this)
        # all of the other times the component is rendered
        else
            (obj.update instanceof Function) and obj.update.apply(this, args)
    
    return Vue.extend(obj)