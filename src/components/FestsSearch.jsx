import React from 'react'

export default function FestsSearch(props) {
  return (
    <div className="search-container">
        <input 
            type="text" 
            placeholder="Search Festivals by Name or City" 
            onChange={e => {
                props.setSearchTerm(e.target.value);
            }}
            value={props.searchTerm ? props.searchTerm : ''}
        />
    </div>
  )
}
