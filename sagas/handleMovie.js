import React from 'react';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

const getPopular = async (pageNum)=>{
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=4f07a7cc8af7e84cb0d294a99bf2eacd&page=${pageNum}`
    const res = await fetch(url)
    const result = await res.json()
    let movies = result.results.map((obj)=>({id:obj.id,title:obj.title,image:obj.poster_path,release_date:obj.release_date}))
      movies = {page:result.page,moviesResult:movies,total_pages:result.total_pages,total_results:result.total_results}
    return movies
}

const getTopRated = async (pageNum)=>{
   const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=4f07a7cc8af7e84cb0d294a99bf2eacd&page=${pageNum}`
   const res = await fetch(url)
   const result = await res.json()
   let movies = result.results.map((obj)=>({id:obj.id,title:obj.title,image:obj.poster_path,release_date:obj.release_date}))
      movies = {page:result.page,moviesResult:movies,total_pages:result.total_pages,total_results:result.total_results}
   return movies
}

const getSearchedMovies = async (searchQuery,pageNum)=>{
   const url = `https://api.themoviedb.org/3/search/movie?api_key=4f07a7cc8af7e84cb0d294a99bf2eacd&query=${searchQuery}&page=${pageNum}&include_adult=false`
   const res = await fetch(url)
   const result = await res.json()
   let movies = result.results.map((obj)=>({id:obj.id,title:obj.title,image:obj.poster_path,release_date:obj.release_date}))
       movies = {page:result.page,moviesResult:movies,total_pages:result.total_pages,total_results:result.total_results}
   return movies
}

const getMovieDetails = async (id)=>{
   const url = `https://api.themoviedb.org/3/movie/${id}?api_key=4f07a7cc8af7e84cb0d294a99bf2eacd`
   const res = await fetch(url)
   const result = await res.json()
   let movieDetails = result
   const movieGenres = result.genres.map((obj)=> " " + obj.name)
         movieDetails = {...movieDetails,movieGenres:movieGenres.toString()}
   const CastRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4f07a7cc8af7e84cb0d294a99bf2eacd`)
   const castResult = await CastRes.json()
   const cast = castResult.cast.map((obj)=>[{name:obj.name,original_name:obj.original_name,profile_path:obj.profile_path}])
         movieDetails = {...movieDetails,cast}
   return movieDetails
}


function* fetchPopularMovie(action) {
   try {
      const movies = yield call(getPopular,action.pageNum);
      yield put({type: "POPULAR_FETCH_SUCCEEDED", popularMovies: movies});
   } catch (e) {
      yield put({type: "POPULAR_FETCH_FAILED", message: e.message});
   }
}

function* fetchTopRatedMovies(action) {
   try {
      const movies = yield call(getTopRated,action.pageNum);
      yield put({type: "TOPRATED_FETCH_SUCCEEDED", topRatedMovies: movies});
   } catch (e) {
      yield put({type: "TOPRATED_FETCH_FAILED", message: e.message});
   }
}

function* fetchSearchedMovies(action) {
   try {
      const movies = yield call(getSearchedMovies,action.searchQuery,action.pageNum);
      yield put({type: "SEARCH_FETCH_SUCCEEDED", searchedMovies: movies});
   } catch (e) {
      yield put({type: "SEARCH_FETCH_FAILED", message: e.message});
   }
}

function* fetchMovieDetails(action) {
   try {
      const movieDetails = yield call(getMovieDetails,action.id);
      yield put({type: "MOVIE_DETAILS_FETCH_SUCCEEDED", movieDetails: movieDetails});
   } catch (e) {
      yield put({type: "MOVIE_DETAILS_FETCH_FAILED", message: e.message});
   }
}


function* mySaga() {
    yield takeEvery("GET_POPULAR", fetchPopularMovie);
    yield takeEvery("GET_TOPRATED", fetchTopRatedMovies);
    yield takeEvery("GET_MOVIE_DETAILS", fetchMovieDetails);
    yield takeEvery("SEARCH_MOVIES", fetchSearchedMovies);
}

export default mySaga;