import {gql} from '@apollo/client';

export const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes(amount: 100) {
      _id
      name
      description
      createAt
      thumbsUp
      thumbsDown
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($ID: ID!) {
    deleteRecipe(ID: $ID)
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($name: String!, $description: String!) {
    createRecipe(recipeInput: {name: $name, description: $description}) {
      name
      description
      createAt
      thumbsUp
      thumbsDown
    }
  }
`;

export const EDIT_RECIPE = gql`
  mutation EditRecipe($ID: ID!, $recipeInput: RecipeInput!) {
    editRecipe(ID: $ID, recipeInput: $recipeInput)
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      userId
      token
    }
  }
`;
