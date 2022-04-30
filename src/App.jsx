import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import axios from "axios";
import Random from "./components/Random/Random";
import GuessDropDown from "./components/Guess/GuessDropDown";
import {Container} from "react-bootstrap";
import Guesses from "./components/Guess/Guesses";
import MovieBar from "./components/UI/MovieBar";
import GoodGuessModal from "./components/Guess/GoodGuessModal";

const App = () => {
    useEffect( () =>{
        axios
        .get(url)
        .then((res)=> setMcuMovies( res.data.data))}
        , []
    )
    const [startPlay, setStartPlay] = useState(false)
    const [randomMovie, setRandomMovie] = useState()
    const [showRandom, setShowRandom] = useState(false)
    const showRandomMovie = () => {setShowRandom(true);};
    const [guesses, setGuesses] = useState([]);
    const startPlayHandler = () =>{
        setStartPlay(true)
        setRandomMovie(mcuMovies[Math.floor(Math.random() * mcuMovies.length)])
    }
    const playAgainHandler = () => {
        setStartPlay(false)
        setShowRandom(false)
        setRandomMovie(mcuMovies[Math.floor(Math.random() * mcuMovies.length)])
        setGuesses([])
    }
    const addGuessHandler = enteredGuess => {
      let pickedMovie ={}
      for (let i = 0; i < mcuMovies.length; i++) {
             if(+enteredGuess === +mcuMovies[i].id){
                 pickedMovie = mcuMovies[i]
                 break
             }
      }
      if (pickedMovie !== randomMovie)(
      setGuesses(prevState => {
          return[...prevState, pickedMovie]
      }))
      if (pickedMovie === randomMovie)
      {
          showRandomMovie()
      }
    }
    const url = 'https://mcuapi.herokuapp.com/api/v1/movies'
    const [mcuMovies, setMcuMovies] = useState();
    return(
        <Container className={'container__body'}>
            <Header/>
             {showRandom && <GoodGuessModal movie={randomMovie} onPlayAgain={playAgainHandler}/>}
            {!startPlay &&<button className={'button__purple'} onClick={startPlayHandler}>Start</button>}
             {startPlay &&<GuessDropDown
                movies={mcuMovies}
                onAddGuess={addGuessHandler}
                onRightGuess={showRandomMovie}
                randomMovie={randomMovie} />}
            {randomMovie && <Guesses guesses={guesses} movies={mcuMovies} random={randomMovie}/>}
        </Container>
    )
}
export default App