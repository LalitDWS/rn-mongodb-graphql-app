/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {gql, useMutation} from '@apollo/client';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REGISTER_MUTATION} from '../queries/queries';

const RegisterScreen = (props: any) => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, {data, error}] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    try {
      const {data} = await register({
        variables: {
          registerInput: {
            email: email,
            password: password,
          },
        },
      });

      // Access the data here
      console.log('Registration successful:', data.register);
      await AsyncStorage.setItem('@user_data', JSON.stringify(data.register));
      goToHomePage();
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error.message);
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
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
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
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>
          Already have a account?{' '}
          <Text onPress={() => navigation.goBack()} style={styles.loginText}>
            Login
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
  registerButton: {
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
  loginText: {
    color: 'dodgerblue',
    fontWeight: 'bold',
  },
});

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
`;

export default RegisterScreen;
