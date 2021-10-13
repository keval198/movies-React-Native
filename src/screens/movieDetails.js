import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper'
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';


const MovieDetails = (props) => {

    const [movieDetails, setmovieDetails] = useState([])
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
       props.getMoviesDetails(props.route.params.id)
    }, [props.route.params.id])

    useEffect(() => {
        setmovieDetails(props.movieDetails)
        setisLoading(false)
    }, [props.movieDetails])
    
    const CastCard = ({item}) => {
        return(
        <View style={styles.castCardContainer}>
        <Card style={styles.castCard}>
          <Card.Cover style={styles.castCardImage} source={{ uri: `https://www.themoviedb.org/t/p/w276_and_h350_face${item[0].profile_path}`}}/>
          <Card.Content style={styles.castCardText}>
            <Title style={styles.castName}>{item[0].name}</Title>
            <Paragraph style={styles.castNameOriginal}>{item[0].original_name}</Paragraph>
          </Card.Content>
        </Card>
        </View>
        )
    }
    if(!isLoading && movieDetails){
        return(
      <>
      <StatusBar/>
      <ScrollView>
      <View style={styles.container}>
          <ImageBackground source={{uri:`https://www.themoviedb.org/t/p/original${movieDetails.backdrop_path}`}} style={styles.backgroundimage} blurRadius={20}>
          <Image source={{uri:`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`}} style={styles.image}/>
          <Text style={styles.title}>{movieDetails.title?movieDetails.title:""}</Text>
          <Text style={styles.date}>{movieDetails.release_date?movieDetails.release_date:""}</Text>
          <Text style={styles.genres}>{movieDetails.movieGenres?movieDetails.movieGenres:""}</Text>
          </ImageBackground>
      </View>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreCircle}><Text style={styles.scoreNum}>{movieDetails.vote_average?movieDetails.vote_average:"N/A"}</Text></View>
        <View><Text style={styles.scoreText}>User Score</Text></View>
      </View>
      <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>{movieDetails.overview?movieDetails.overview:"N/A"}</Text>
      </View>
      <View style={styles.fullcastContainer}>
          <Text style={styles.fullcaseTitle}>Full Cast</Text>
          <FlatList
            data={movieDetails.cast}
            renderItem={CastCard}
            extraData={movieDetails.cast}
            horizontal={true}
            />
      </View>
      </ScrollView>
      </>
  );

  }else{
    return(
        <View style={styles.loading}><ActivityIndicator size="large"  style={styles.loading} color="cyan"/></View>
    );
  }
}

  const styles = StyleSheet.create({
    container:{
        height:560,
        alignItems:'center',
        backgroundColor:'#3a3f3f'
        },
    image:{
        margin:26,
        width:220,
        height:330,
        alignSelf:'center'
    },
    title:{
        margin:10,
        fontSize:30,
        alignSelf:'center',
        color:'aliceblue'
    },
    date:{
        fontSize:16,
        marginTop:10,
        alignSelf:'center',
        color:'aliceblue'
    },
    temp:{
        alignSelf:'center'
    },
    genres:{
        fontSize:16,
        marginTop:10,
        alignSelf:'center',
        color:'aliceblue'
    },
    backgroundimage:{
        height:'100%',
        width:'100%'
    },
    scoreContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#3a3f3f'
    },
    scoreCircle:{
        margin:10,
        height:60,
        width:60,
        backgroundColor:'cyan',
        borderRadius:60,
        justifyContent:'center',
        alignItems:'center'
    },
    scoreNum:{
        fontSize:18,
        color:'aliceblue'
    },
    scoreText:{
        fontSize:18,
        color:'aliceblue'
    },
    overviewContainer:{
        padding:20,
        backgroundColor:'#3a3f3f',
        width:'100%'
    },
    overviewTitle:{
        fontSize:24,
        color:'aliceblue'
    },
    overviewText:{
        marginTop:10,
        fontSize:16,
        color:'aliceblue'
    },
    fullcastContainer:{
        padding:20,
        backgroundColor:'#3a3f3f'
    },
    fullcaseTitle:{
        fontSize:26,
        color:'aliceblue'
    },
    castCardContainer:{
        margin:20,
        backgroundColor:'#3a3f3f'
    },
    castCard:{
        width:138,
        borderRadius:10,
        backgroundColor:'#272b2b'
    },
    castCardImage:{
        backgroundColor:'#3a3f3f'
    },
    castName:{
        fontSize:14,
        color:'aliceblue'
    },
    castNameOriginal:{
        fontSize:12,
        color:'aliceblue'
    },
    loading:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#3a3f3f'
    }
});

function mapStateToprops(state){
    return{
        movieDetails: state.movieDetails
    }
}

function mapDispatchToMatch(dispatch){
    return{
        getMoviesDetails: (id) => dispatch({type:'GET_MOVIE_DETAILS',id:id}),
        clearMovie: () => dispatch({type:'CLEAR_MOVIE'})
    }
}


export default connect(mapStateToprops, mapDispatchToMatch)(MovieDetails);