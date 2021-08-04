const Recipe = require('../models/recipe');

class SetupRecipeDb
{
    constructor()
    {
      this.recipes = []
    }

    async cleanDb()
    {
      await Recipe.remove({});
    }

    pushRecipesToDb()
    {
      this.recipes.forEach((recipe) => {
        const newRecipe = new Recipe(recipe);
        newRecipe.save();
      })
    }

    seedDb()
    {
        this.cleanDb();
        this.pushRecipesToDb();
    }

  }

  module.exports = SetupRecipeDb;
    