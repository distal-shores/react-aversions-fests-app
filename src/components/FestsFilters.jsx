import React from 'react';
import _ from 'lodash';

export default function FestsFilters(props) {

    const filters = [
        'all',
        'active',
        'inactive',
        'upcoming',
        'response',
        'no_response'
    ];

    function refresh() {
        props.refetch();
    }
    
    return (
        <div className="filters-container">
            {filters.map((filt) => (
                <button 
                    id={filt}
                    className="filter" 
                    onClick={() => {
                        props.setFilter(filt)
                        props.festsFiltered()
                    }}
                >
                    {_.startCase(_.toLower(filt))}
                </button>
            ))}
            <button className="filters-refresh" onClick={refresh}>Refresh</button>
        </div>
    )
}
