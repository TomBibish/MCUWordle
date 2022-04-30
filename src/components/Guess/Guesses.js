import MovieBar from "../UI/MovieBar";

const Guesses = props => {
    return(
        <>
            {props.guesses && props.guesses.map(movie => (
                <MovieBar key={movie.id} movie={movie} class={'wrong'}
                          phase_class={props.random.phase === movie.phase ? 'right' : 'wrong'}
                          box_office={+props.random.box_office > +movie.box_office ? 'bigger' : 'smaller'}
                          minutes={+props.random.minutes > +movie.minutes ? 'longer' : 'shorter'}/>
            ))}
        </>
    )
}
export default Guesses