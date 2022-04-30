import React from "react";
import MovieBar from "../UI/MovieBar";
let randomMovie = {}
const Random = props =>{
    if(props.movies) {
        randomMovie = props.movies[Math.floor(Math.random() * props.movies.length)]
    }
    return(
        <>
            {props.showRandom &&<MovieBar movie={randomMovie}/>}
        </>
    )
}
export default Random