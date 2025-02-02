import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from './components/list';
import Detail from './components/detail';
import Edit from './components/edit';

// Import necessary components from React Navigation v5
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create a Stack Navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen
          name="MovieList"
          component={MovieList}
          options={{
            title: 'Movie Rater',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: 'Movie'
          }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            title: 'Edit'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
