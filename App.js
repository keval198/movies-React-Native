import React from 'react';
import { createStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Popular from './src/screens/popular';
import { applyMiddleware } from 'redux'
import movieSaga from './sagas/handleMovie'
import createSagaMiddleware from 'redux-saga'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toprated from './src/screens/Toprated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MovieDetails from './src/screens/movieDetails';
import Search from './src/screens/search';
import SearchResult from './src/screens/searchResult'
const sagaMiddleware = createSagaMiddleware()

const initState = {
    popularMovies : null,
    topRatedMovies: null,
    searchedMovies:null,
    movieDetails: null
}

const reducerMovie = (state=initState,action)=>{
  switch(action.type){
    case "POPULAR_FETCH_SUCCEEDED":
    return {popularMovies: action.popularMovies}
    case "TOPRATED_FETCH_SUCCEEDED":
    return {topRatedMovies: action.topRatedMovies}
    case "MOVIE_DETAILS_FETCH_SUCCEEDED":
    return {movieDetails: action.movieDetails}
    case "SEARCH_FETCH_SUCCEEDED":
      return{searchedMovies:action.searchedMovies}
    case "CLEAR_MOVIES":
      return{searchedMovies:null}
  }
  return state
}

const store = createStore(reducerMovie,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(movieSaga)

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigationHome = () =>{
  return(
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Popular') {
        iconName = focused
          ? 'flame'
          : 'flame-outline';
      } else if (route.name === 'Toprated') {
        iconName = focused ? 'star' : 'star-outline';
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarStyle:{backgroundColor:'#272b2b'},
    tabBarActiveTintColor:'aliceblue',
    tabBarInactiveTintColor:'gray',
  })}>
<Tab.Screen name="Popular" component={Popular} options={
  {headerStyle:{backgroundColor:'#272b2b'},headerTintColor:'aliceblue'}
}/>
<Tab.Screen name="Toprated" component={Toprated} options={
  {headerStyle:{backgroundColor:'#272b2b'},headerTintColor:'aliceblue'}
}/>
</Tab.Navigator>)
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator>        
          <Stack.Screen   
          name="Home"          
          component={TabNavigationHome}          
          options={{ headerShown: false }}        
          />        
          <Stack.Screen name="MovieDetails" component={MovieDetails} options={{
            title:"Movie Details",
            headerStyle:{backgroundColor:'#272b2b'},
            headerTintColor:'aliceblue'}
          }/>  
          <Stack.Screen name="Search" component={Search} options={{
            headerStyle:{backgroundColor:'#272b2b'},
            headerTintColor:'aliceblue'}
          }/>
          <Stack.Screen name="SearchResult" component={SearchResult} options={{
            title:"Search Result",
            headerStyle:{backgroundColor:'#272b2b'},
            headerTintColor:'aliceblue'}
          }/>
        </Stack.Navigator>      
      </NavigationContainer>
    </Provider>
  );
};

export default App;