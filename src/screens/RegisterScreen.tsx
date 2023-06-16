import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const RegisterScreen = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password confirmation"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
        />
        <Button color="green" title="Register" />

        <View style={styles.registerOption}>
          <Text>Already have an account؟</Text>
          <TouchableOpacity onPress={_ => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
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

export default RegisterScreen;
