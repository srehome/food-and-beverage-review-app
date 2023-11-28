import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import Screens here
import HomeScreen from './Screens/HomeScreen';
import AddItemScreen from './Screens/AddItemScreen';
import BrandsScreen from './Screens/BrandsScreen';
import RestaurantScreen from './Screens/RestaurantScreen';
import DisplayItemScreen from './Screens/MockDisplayItemScreen';
import DetailScreen from './Screens/DetailScreen';
import DisplayReviewScreen from './Screens/DisplayReviewScreen';

const Stack = createNativeStackNavigator();

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Home'}}
      />
      <Stack.Screen
      name="Restaurants"
      component={RestaurantScreen}
      options={{
        title: 'Restaurants',
        headerTitleStyle:{
          fontWeight: 'bold',
        },
        headerTintColor: 'black',
        headerStyle: {backgroundColor: '#c7e1ff'}
      }}
      />
      <Stack.Screen
      name="Brands"
      component={BrandsScreen}
      options={{
        headerTintColor: 'black',
        headerStyle: {backgroundColor: '#c7e1ff'}
      }}
      />
      <Stack.Screen
      name="Add Item"
      component={AddItemScreen}
      options={{
        headerTintColor: 'black',
        headerStyle: {backgroundColor: '#c7e1ff'}
      }}
      />
      <Stack.Screen
        name="Display Item"
        component={DisplayItemScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {backgroundColor: "#c7e1ff"}
        }}>
      </Stack.Screen>
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {backgroundColor: "#c7e1ff"}
        }}>
      </Stack.Screen>
      <Stack.Screen
        name="Display Review"
        component={DisplayReviewScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {backgroundColor: "#c7e1ff"}
        }}>
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const App = () => {
  const [text, onChangeText] = React.useState('Search');

  return (
    <NavigationContainer>
     <MyStack />
    </NavigationContainer>
  );
};

export default App;
