const Recipe = require("../models/Recipe");
const User = require("../models/User");
const userResolvers = require("./resolvers/user");

module.exports = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    ...userResolvers.Mutation,
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });

      const res = await createdRecipe.save(); // MongoDB saving

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted; // 1 if something was deleted, 0 if not was deleted
    },
    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const result = await Recipe.updateOne(
        { _id: ID },
        { name: name, description: description }
      );
      const wasEdited = result.matchedCount > 0 && result.modifiedCount > 0;
      return wasEdited; // 1 if something was edited, 0 if not was edited
    },
  },
};
