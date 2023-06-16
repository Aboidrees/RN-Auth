import React, {createContext, useContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserInfoProps = {
  id: 1;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};

type AuthContextProps = {
  isLoading: boolean;
  splashLoading: boolean;
  userInfo: UserInfoProps;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [userInfo, setUserInfo] = useState({} as UserInfoProps);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name: string, email: string, password: string) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/register`, {name, email, password})
      .then(({data}) => {
        console.log(data);
        //! this wll cause direct login when user register and thats not our case.
        setUserInfo(data);
        AsyncStorage.setItem('userInfo', JSON.stringify(data));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`register error ${e}`);
      });
    setIsLoading(false);
  };

  const login = (email: string, password: string) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/login`, {username: email.split('@')[0], password})
      .then(({data}) => {
        console.log(data);
        setUserInfo(data);
        AsyncStorage.setItem('userInfo', JSON.stringify(data));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    //* correct implementation
    /*axios
      .post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.token}`},
        },
      )
      .then(({data}) => {
        console.log(data);

        AsyncStorage.removeItem('userInfo');
        setUserInfo({} as UserInfoProps);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
      */

    //! fake implementation
    AsyncStorage.removeItem('userInfo');
    setUserInfo({} as UserInfoProps);
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      const userAsString = (await AsyncStorage.getItem('userInfo')) ?? '';

      const user = JSON.parse(userAsString);

      if (user) {
        setUserInfo(user);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`login check error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        isLoggedIn,
        splashLoading,
        userInfo,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
