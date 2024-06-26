import View from './view.js'

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload')
    _message = 'Recipe upload successfull!'
    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor() {
        super()
        this._addHandlerShowWindow()
        this._addHandlerHideWindow()
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault()
            const dataArray = [...new FormData(this)]
            const data = Object.fromEntries(dataArray)
            handler(data)
        })
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    _generateMarkup() {

    }
}

export default new AddRecipeView()