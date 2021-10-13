import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  ActivityIndicator,
  Button,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';

const Search = (props) =>{
    const [searchQuary, setsearchQuary] = useState("")
    const [text, settext] = useState("")
    
    return(
        <>
        <StatusBar/>
        <View>
            <Searchbar 
            placeholder="Search"
            onChangeText={(query)=>setsearchQuary(query)}
            value={searchQuary}
            onSubmitEditing={()=>settext(searchQuary)}
            />
            <Text>{text}</Text>
        </View>
        </>
    );
}

export default Search;