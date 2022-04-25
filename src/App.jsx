import React from "react";
import Header from "./components/header/Header";
import Guess from "./components/Guess/Guess";
import {GuessClass} from "./Guess";

const App = () => {
    return(
        <div>
            <Header/>
            <GuessClass/>
        </div>
    )
}
export default App