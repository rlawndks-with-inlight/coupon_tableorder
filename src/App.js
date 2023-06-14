import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 

//screen
import Home from './screen/Home';

const Stack = createStackNavigator(); 

const App = () => {

  return (
    <>
       <NavigationContainer> 
        	{/* 네비게이션 기본틀의 스택을 생성 */} 
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}> 
            	{/* 해당스택에 들어갈 화면 요소를 넣어준다. */}
                <Stack.Screen name={"Home"} component={Home}/> 
            </Stack.Navigator> 
        </NavigationContainer> 
    </>
  );
};

export default App;
