import React from 'react';
import { Form } from 'react-bulma-components';

export default function FestsSearch(props) {
  const { Input } = Form;
  return (
    <div className="search-container">
        <Input 
            type="text"
            size="small"
            placeholder="Search Festivals by Name or City" 
            onChange={e => {
                props.setSearchTerm(e.target.value);
            }}
            value={props.searchTerm ? props.searchTerm : ''}
        />
    </div>
  )
}
