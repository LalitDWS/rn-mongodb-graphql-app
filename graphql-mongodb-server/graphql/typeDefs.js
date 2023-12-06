const { gql } = require("apollo-server");

module.exports = gql`
  type Recipe {
    _id: String
    name: String
    description: String
    createAt: String
    thumbsUp: Int
    thumbsDown: Int
  }

  input RecipeInput {
    name: String
    description: String
  }

  type User {
    userId: ID
    token: String
  }

  input RegisterInput {
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean

    register(registerInput: RegisterInput): String
    login(loginInput: LoginInput): User
  }
`;
