import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useAuthContext} from '../contexts/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = () => {
  const {userInfo, isLoading, logout} = useAuthContext();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text
        style={
          styles.welcomingText
        }>{`Welcome, ${userInfo.firstName} ${userInfo.lastName} `}</Text>
      <Button color="red" title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomingText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeScreen;
