import React, {useState} from "react";
import {Button, Container, Dropdown, FormControl} from "react-bootstrap";
import axios from "axios";
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
import {BsFillArrowUpCircleFill} from  'react-icons/bs'
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
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
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
              !value || child.props.children.toLowerCase().includes(value.toLowerCase()),
          )}
        </ul>
      </div>
    );
  },
);
export class GuessClass extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            movies: [],
            random_movie:{},
            guesses :[]
        }
        this.renderGuess = this.renderGuess.bind(this)
        this.startGuess = this.startGuess.bind(this)
        this.getGuesses = this.getGuesses.bind(this)
    }
    componentDidMount() {
        const url = 'https://mcuapi.herokuapp.com/api/v1/movies'
          axios
            .get(url)
            .then((res)=> this.setState(
                {movies:res.data.data
            }))
    }
    getMovieDrop(movie){
        return(
            <Dropdown.Item eventKey={movie.id}>{movie.title}</Dropdown.Item>
        )
    }
    startGuess(){
        this.setState({random_movie: this.state.movies[Math.floor(Math.random() * this.state.movies.length)]})
    }
    renderGuess(movie){
        let movieData = ''
        for(let i=0; i < this.state.movies.length; i ++) {
                if(movie==this.state.movies[i]['id']) {
                    movieData = this.state.movies[i]
                }
            }
        var joined = this.state.guesses.concat(movieData);
        this.setState({ guesses: joined })
        // this.state.guesses.push(movieData)
    }
    getGuesses(movie){
        return(
           <>
               {this.state.random_movie != movie ?
                <div key={movie.id} className={'guess__container'}>
                    <p>{movie.title}</p>
                    <p>{movie.release_date}</p>
                    {parseInt(this.state.random_movie.box_office) > parseInt(movie.box_office)?
                        <p> $ {movie.box_office} <BsFillArrowUpCircleFill/></p>
                        :
                        <p> $ {movie.box_office} <BsFillArrowDownCircleFill/></p>
                    }
                    {parseInt(this.state.random_movie.duration) > parseInt(movie.duration)?
                        <p>{movie.duration} min <BsFillArrowUpCircleFill/></p>
                        :
                        <p>{movie.duration} min <BsFillArrowDownCircleFill/></p>
                    }
                    {this.state.random_movie.phase !== movie.phase?
                        <p>Phase {movie.phase}</p>
                        :
                        <p style={{background:"green"}}>Phase {movie.phase}</p>
                    }
                    <img alt='Movie' src={movie.cover_url}/>
                </div>
                   :
                   window.alert('Succeed')}
            </>
        )
    }
     render() {
         let movieDrops = this.state.movies.map(
            this.getMovieDrop)
         let guesessChoice = this.state.guesses.map(
             this.getGuesses)
        return(
            <Container>
                <section style={{textAlign:"center"}}>
                    {Object.keys(this.state.random_movie).length==0 &&
                        <Button onClick={this.startGuess}>Start MCU Wordle</Button>}
                    {Object.keys(this.state.random_movie).length!=0
                        &&<Dropdown onSelect={this.renderGuess}>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            Start Guess
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomMenu}>
                            {movieDrops}
                        </Dropdown.Menu>
                  </Dropdown>}
                    <div>
                        {guesessChoice}
                    </div>
                </section>
            </Container>
        )
     }
}

