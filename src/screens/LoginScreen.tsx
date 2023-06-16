import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuthContext} from '../contexts/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('atuny0@sohu.com');
  const [password, setPassword] = useState('9uQFF1Lh');

  const {login, isLoading} = useAuthContext();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Enter email"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          color="green"
          title="login"
          onPress={_ => login(email, password)}
        />

        <View style={styles.registerOption}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={_ => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  registerOption: {
    flexDirection: 'row',
    marginTop: 20,
  },
  link: {
    color: 'green',
    marginLeft: 4,
  },
});

export default LoginScreen;
