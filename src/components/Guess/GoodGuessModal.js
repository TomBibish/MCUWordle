import './GoodGuessModal.css'
import MovieBar from "../UI/MovieBar";
import React from "react";
const GoodGuessModal = props =>{
    return(
        <div>
            <div className='backdrop' onClick={props.onPlayAgain}/>
             <div className='modal__1'>
                    <header className='header'>
                        <h2>
                        Success!
                        </h2>
                    </header>
                    <div className='content'>
                        <MovieBar movie={props.movie}
                                  class={'right'}
                                  phase_class={'right'}/>
                    </div>
                    <footer className='actions'>
                        <button className='button__purple' onClick={props.onPlayAgain}>Start Again</button>
                    </footer>
            </div>
        </div>
    )
}
export default GoodGuessModal