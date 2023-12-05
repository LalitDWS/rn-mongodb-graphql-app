import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddRecipeScreen, HomeScreen} from '../screens';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

export default function App() {
  const Stack = createNativeStackNavigator();
  const uri = 'http://10.0.101.156:5001/';

  const client = new ApolloClient({
    uri: uri,
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
