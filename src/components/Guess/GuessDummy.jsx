import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Dropdown, FormControl} from "react-bootstrap";
const GuessDummy = () => {
    const [guess, getGuess] = useState('')
    const url = 'https://mcuapi.herokuapp.com/api/v1/movies'
    useEffect(() =>{
        getAllMovies();
        },
        []);

    const getAllMovies = () =>{
        axios
            .get(url)
            .then((res)=> {
                const allGuess = res.data.data;
                getGuess(allGuess);
            })
    }
    const getRandomGuess = (guessArray) =>{
        let randGuess = guessArray[Math.floor(Math.random() * guessArray.length)];
        return(
        <div>
            <div className={'guess__container'}>
                <p>{randGuess.title}</p>
                <p>{randGuess.release_date}</p>
                <p> $ {randGuess.box_office}</p>
                <p>{randGuess.duration} min</p>
                <p>Phase {randGuess.phase}</p>
                <img src={randGuess.cover_url}/>
            </div>
        </div>
        )
    }
    const getMovieDrop = (movie) =>{
        return(
            <Dropdown.Item eventKey={movie.id}>{movie.title}</Dropdown.Item>
        )
    }
    const showGuess = (movie) =>{
        console.log(movie)
        let movieData = guess[movie-1]
        console.log(movieData)
        return(
            <div className={'guess__container'}>
                <p>{movieData.title}</p>
                <p>{movieData.release_date}</p>
                <p> $ {movieData.box_office}</p>
                <p>{movieData.duration} min</p>
                <p>Phase {movieData.phase}</p>
                <img src={movieData.cover_url}/>
            </div>
        )
    }
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
          <a
            href=""
            ref={ref}
            onClick={(e) => {
              e.preventDefault();
              onClick(e);
            }}
          >
            {children}
            &#x25bc;
          </a>));
    const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

    return(
        <section>
                  {guess.length !== 0 && <Dropdown onSelect={showGuess}>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                      Start Guess
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                        {guess.map(getMovieDrop)}
                    </Dropdown.Menu>
                  </Dropdown>}
                {/*<div style={{display:"none"}}>*/}
                {/*    {guess.length !== 0 &&<h1>*/}
                {/*        {getRandomGuess(guess)}*/}
                {/*    </h1>}*/}
                {/*</div>*/}
        </section>
    )
}
export default GuessDummy