import {Container} from "react-bootstrap";
import React from "react";
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
const MovieBar = props =>{
    return(
            <Container className={'guess__container'}>
                <p className={props.class}>{props.movie.title}</p>
                <p className={props.class}>{props.movie.release_date}</p>
                {props.box_office === 'bigger' &&
                    <p className={props.class}><BsFillArrowUpCircleFill/> $ {props.movie.box_office}</p>}
                {props.box_office === 'smaller' &&
                    <p className={props.class}><BsFillArrowDownCircleFill/> $ {props.movie.box_office}</p>}
                {props.box_office === undefined && <p className={props.class}> $ {props.movie.box_office}</p>}
                {props.minutes === 'longer' &&
                    <p className={props.class}><BsFillArrowUpCircleFill/>{props.movie.duration} min</p>}
                {props.minutes === 'shorter' &&
                    <p className={props.class}><BsFillArrowDownCircleFill/> {props.movie.duration} min</p>}
                {props.minutes === undefined && <p className={props.class}>{props.movie.duration} min</p>}
                <p className={props.phase_class}>Phase {props.movie.phase}</p>
                <img alt='cover' src={props.movie.cover_url}/>
            </Container>
    )
}
export default MovieBar