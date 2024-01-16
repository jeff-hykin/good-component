class AfterSilent {
    constructor({minDelay, callback,}) {
        this.callback = callback
        this.minDelay = minDelay
        this.timeoutId = null
    }
    call(func) {
        console.log(`here`)
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(func||this.func, this.minDelay)
    }
}
export default AfterSilent