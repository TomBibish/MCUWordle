import React, {useState} from "react";
import {Container, Dropdown, FormControl} from "react-bootstrap";

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
let moviesDropDowns = []
const GuessDropDown = props =>{
    if (props.movies){
        moviesDropDowns = props.movies.map( movie =>(
            <Dropdown.Item eventKey={movie.id} key={movie.id}>
                {movie.title}
            </Dropdown.Item>)
        )
    }

    return(
        <Dropdown onSelect={props.onAddGuess}>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            Start Guess
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                        {moviesDropDowns}
                    </Dropdown.Menu>
        </Dropdown>
    )

}
export default GuessDropDown