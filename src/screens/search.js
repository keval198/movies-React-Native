import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';

const Search = (props) =>{
    const [searchQuery, setsearchQuery] = useState("")    
    return(
        <>
        <StatusBar/>
        <View style={styles.container}>
            <Searchbar 
            placeholder="Search"
            onChangeText={(query)=>setsearchQuery(query)}
            value={searchQuery}
            onSubmitEditing={()=>{
                setsearchQuery(searchQuery)
                    if(searchQuery){
                        props.navigation.navigate('SearchResult',{searchQuery:searchQuery})
                    }else{
                        alert('Search query cannot be Empty')
                    }
                }
            }
            />
        </View>
        </>
    );

}
const styles = StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'#3a3f3f'
    }
});

export default Search;