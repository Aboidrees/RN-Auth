import React from 'react';

import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/contexts/AuthContext';
import {StatusBar} from 'react-native';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="green" />
      <Navigation />
    </AuthProvider>
  );
}

export default App;
