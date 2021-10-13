import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Button
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';


  const Popular = (props) => {
    const [movies, setmovies] = useState(props.popularMovies)
    const [pageNum, setpageNum] = useState(1)
    const [isLoading, setisLoading] = useState(true)
    const [totalPage, settotalPage] = useState(0)

    
  React.useLayoutEffect(() =>{
    props.navigation.setOptions({
      headerRight: () => <Ionicons name="search" size={28} color="aliceblue" style={{marginRight:20}} onPress={() => props.navigation.navigate('Search')}/>
    })
  })
    
    const flatListRef = React.useRef(null);

    const MovieCard = ({item}) =>{
        return(
        <View style={styles.container}>
          <Card style={styles.card} onPress={()=>props.navigation.navigate('MovieDetails',{id:item.id})}>
            <Card.Cover style={styles.image} source={{ uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.image}` }} />
            <Card.Content>
              <Title style={styles.text}>{item.title}</Title>
              <Paragraph style={styles.text}>{item.release_date}</Paragraph>
            </Card.Content>
          </Card>
          </View>);
    }
    
    const LoadingComponent = () =>{
      return(
        <View style={styles.loadingComponent}><ActivityIndicator size="large"  style={styles.loading} color="cyan"/></View>
      );
    }

    const FooterComponent = () =>{
      if(totalPage!==pageNum){
      return(
        <Button title="Next" onPress={()=>{
          scrollUp()
          setpageNum(pageNum+1)
        }
        } color="#272b2b"/>
      );
      }else{
        return(
          <View></View>
        );
      }
    }
      const renderitem = ({item,index}) =>{
          return(
            <MovieCard item={item} />
          );
      }

      useFocusEffect(
        React.useCallback(() => {      
          props.getMovies(pageNum)
        }, [pageNum])
      );

    
      useEffect(() => {
        if(props.popularMovies){
          setmovies(props.popularMovies.moviesResult)
          settotalPage(props.popularMovies.total_pages)
          setisLoading(false)
        }
      }, [props.popularMovies])

    const scrollUp = () =>{
        flatListRef.current.scrollToIndex({index:0})
    }
    
    if(props.popularMovies!==null && !isLoading){
    return (
        <>
        <StatusBar />
        <FlatList
            ref={flatListRef}
            data={movies}
            renderItem={renderitem}
            keyExtractor={item=>item.id}
            extraData={movies}
            ListEmptyComponent={LoadingComponent}
            ListFooterComponent={FooterComponent}
            style={styles.flatList}
            />
        </>
    );
        }else{
            return (
                <>
                <StatusBar />
                <View style={styles.loadingComponent}><ActivityIndicator size="large"  style={styles.loading} color="cyan"/></View>
                </>
            );
        }
  };
  
  const styles = StyleSheet.create({
    container:{
      width:'100%',
      alignItems:'center',
      padding:10,
      backgroundColor:'#3a3f3f'
      },
    card:{
      width:220,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#272b2b'
    },
    image:{
      width:220,
      height:330,
      backgroundColor:'#3a3f3f'
    },
    text:{
      color:'aliceblue'
    },
    loading:{
      height:'100%',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#3a3f3f'
    },
    loadingComponent:{
      height:'100%'
    },
    flatList:{
      backgroundColor:'#3a3f3f'
    }
  });

  function mapStateToprops(state){
      return{
          popularMovies: state.popularMovies
      }
  }

  function mapDispatchToMatch(dispatch){
      return{
          getMovies: (pageNum) => dispatch({type:'GET_POPULAR',pageNum:pageNum})
      }
  }
  
  export default connect(mapStateToprops, mapDispatchToMatch)(Popular);