import View from './view.js'
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        const currPage = this._data.page

        if (currPage === 1 && numPages > 1) return this._renderForwardButton(currPage)

        if (currPage === numPages && numPages > 1) return this._renderBackButton(currPage)

        if (currPage < numPages) return this._renderBackButton(currPage) + this._renderForwardButton(currPage)

        return ''
    }

    _renderBackButton(page) {
        return `
            <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${page - 1}</span>
            </button>`
    }

    _renderForwardButton(page) {
        return `
            <button class="btn--inline pagination__btn--next">
                <span>Page ${page + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`
    }
}

export default new PaginationView()