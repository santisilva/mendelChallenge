import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Book, Home} from '../screens';
import {NavigationContainer} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Book: {
    key: string;
    title: string;
    author_name: string[];
    cover_i: number;
    first_publish_year: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Book" component={Book} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
