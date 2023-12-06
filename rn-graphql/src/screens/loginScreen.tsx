/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {LOGIN_MUTATION} from '../queries/queries';
import {useMutation} from '@apollo/client';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = (props: any) => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [login, {data, error}] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    setLoading(true);
    _checkHomePageRoute();
  }, []);

  const _checkHomePageRoute = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('@user_data'));
    if (userData) {
      goToHomePage();
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const {data} = await login({
        variables: {loginInput: {email, password}},
      });

      // Access the data here
      console.log('Login successful:', data.login);
      await AsyncStorage.setItem('@user_data', JSON.stringify(data.login));
      setLoading(false);
      goToHomePage();
    } catch (error) {
      setLoading(false);
      // Handle login error
      console.error('Login error:', error.message);
    }
  };

  const goToHomePage = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      }),
    );
  };

  return (
    <Container>
      <Spinner visible={loading} color={'#000'} textContent={'Loading...'} />
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>
          Don't have an account?{' '}
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.registerText}>
            Register
          </Text>
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: 'dodgerblue',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textStyle: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  registerText: {
    color: 'dodgerblue',
    fontWeight: 'bold',
  },
});

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
`;

export default LoginScreen;
