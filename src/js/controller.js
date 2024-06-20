import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import bookmarksView from './views/bookmarksView.js'
import paginationView from './views/paginationView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'


const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return

    recipeView.renderSpinner()

    resultsView.update(model.getSearchResultPage())
    bookmarksView.update(model.state.bookmarks)

    await model.loadRecipe(id)

    recipeView.render(model.state.recipe)
  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner()
    const query = searchView.getQuery()
    
    if (!query) return

    await model.loadSearchResults(query)

    resultsView.render(model.getSearchResultPage(1))
    paginationView.render(model.state.search)
  } catch (err) {
    console.error(err)
  }
}

const controlPagination = (goToPage) => {
  resultsView.render(model.getSearchResultPage(goToPage))
  paginationView.render(model.state.search)
}

const controlServings = (newServings) => {
  model.updateServings(newServings)
  //recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = () => {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else if (model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id)
  recipeView.update(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
}

const init = () => {
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
}

init()