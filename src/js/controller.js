import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import bookmarksView from './views/bookmarksView.js'
import paginationView from './views/paginationView.js'
import addRecipeView from './views/addRecipeView.js'
import { MODAL_CLOSE_SEC } from './config.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'


const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return

    recipeView.renderSpinner()

    resultsView.update(model.getSearchResultPage())
  
    await model.loadRecipe(id)

    recipeView.render(model.state.recipe)
    bookmarksView.update(model.state.bookmarks)
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

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async (newRecipe) => {
  try {
    addRecipeView.renderSpinner()
    await model.uploadRecipe(newRecipe)
    recipeView.render(model.state.recipe)
    addRecipeView.renderMessage()
    bookmarksView.render(model.state.bookmarks);
    setTimeout(() => addRecipeView.toggleWindow(), MODAL_CLOSE_SEC * 1000)
  } catch (err) {
    addRecipeView.renderError(err.message)
  }
}

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init()