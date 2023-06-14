import {reactive} from 'vue'

export const store = reactive({
    user: null,
    token: null,
    errorTexts: [],
    successTexts: [],

    displayError(text) {
        this.errorTexts.push(text)
        // after 3 seconds, remove the error
        setTimeout(() => {
            this.errorTexts.shift()
        }, 3000)
    },
    displaySuccess(text) {
        this.successTexts.push(text)
        // after 3 seconds, remove the error
        setTimeout(() => {
            this.successTexts.shift()
        }, 3000)
    }
})
