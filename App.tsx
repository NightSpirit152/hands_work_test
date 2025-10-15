import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShiftsList from './src/screens/ShiftsList';
import ShiftDetails from './src/screens/ShiftDetails';

export type RootStackParamList = {
  ShiftsList: undefined;
  ShiftDetails: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ShiftsList" component={ShiftsList} options={{ title: 'Смены рядом' }} />
        <Stack.Screen name="ShiftDetails" component={ShiftDetails} options={{ title: 'Детали смены' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
