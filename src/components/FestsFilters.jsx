import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bulma-components';

export default function FestsFilters(props) {

    const filters = [
        'all',
        'active',
        'inactive',
        'upcoming',
        'response',
        'no_response'
    ];

    return (
        <div className="filters-container">
            {filters.map((filt, index) => (
                <Button
                    color="black-ter"
                    size="small"
                    key={filt+index}
                    id={filt}
                    className="filter"
                    isSelected={filt===props.filter ? true : false}
                    onClick={() => {
                        props.setFilter(filt)
                        props.festsFiltered()
                    }}
                >
                    {_.startCase(_.toLower(filt))}
                </Button>
            ))}
            <Button color="primary" size="small" className="filters-refresh" onClick={props.refresh}>Refresh</Button>
        </div>
    )
}
