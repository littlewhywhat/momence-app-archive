import React from 'react';
import {RootStack} from './src/navigation/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './src/theme';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RootStack />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
