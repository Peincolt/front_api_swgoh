import theme from '../../assets/css/autocomplete.css'
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
export default function Autocomplete(props)
{
    const list = props.list
    const [suggestions, setSuggestions] = useState([])
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : list.filter(lang =>
          lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };
    const getSuggestionValue = suggestion => suggestion.name
    const renderSuggestion = (suggestion, {isHighlighted }) => (
        <div className={`form-control ${isHighlighted ? 'focus' : ''}`} onMouseOver={e => e.target.classList.add('focus')} onMouseOut={e => e.target.classList.remove('focus')}>
          {suggestion.name}
        </div>
    );
    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    };
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={props.inputProps}
          theme={theme}
        />
      );
}