import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import StackNavigator from './src/navigation';

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StackNavigator />
    </QueryClientProvider>
  );
}

export default App;
