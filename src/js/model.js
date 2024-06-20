import { API_URL, RES_PER_PAGE } from './config.js'
import { getJSON } from './helpers.js'

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1
    },
    bookmarks: []
}

export const loadRecipe = async (id) => {
    try {
        const data = await getJSON(`${API_URL}${id}`)
        const { recipe } = data.data

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceURL: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }

        if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true
        else state.recipe.bookmarked = false
    } catch (err) {
        throw err
    }
}

export const loadSearchResults = async (query) => {
    try {
        state.search.query = query
        const data = await getJSON(`${API_URL}?search=${query}`)

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        })
        
    } catch (err) {
        throw err
    }
}

export const getSearchResultPage = (page = state.search.page) => {
    state.search.page = page

    const start = (page - 1) * state.search.resultsPerPage
    const end = page * state.search.resultsPerPage

    return state.search.results.slice(start, end)
}

export const updateServings = (newServings) => {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings
    })

    state.recipe.servings = newServings
}

const persistsBookmarks = () => {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = (recipe) => {
    state.bookmarks.push(recipe)

    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true

    persistsBookmarks()
}

export const deleteBookmark = (id) => {
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index, 1)

    if (id === state.recipe.id) state.recipe.bookmarked = false

    persistsBookmarks()
}

const init = () => {
    const storage = localStorage.getItem('bookmarks')
    if (storage) state.bookmarks = JSON.parse(storage)
}

init()