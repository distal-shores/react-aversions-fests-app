import React from 'react';
import FestsTableDropdown from './FestsTableDropdown.jsx';
import FestsTableCheckbox from './FestsTableCheckbox.jsx';

export default function FestsTable(props) {
  function checkSearchTerm(fest) {
    if(fest.Name.toLowerCase().includes(props.searchTerm.toLowerCase())) {
      return fest;
    } else if (fest.City.toLowerCase().includes(props.searchTerm.toLowerCase())) {
      return fest;
    }
  }
  return (
    <table className="festList">
      <thead>
        <tr>
          {props.headers.map((header, index) => (
            <th key={(Math.random() + 1).toString(36).substring(7)}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.festsFiltered()
        .filter(checkSearchTerm)
        .map((fest, index) => (
          <tr key={(Math.random() + 1).toString(36).substring(7)}>
            {props.headers.map((header) => {
              if (header === 'Response') {
                return <FestsTableCheckbox refresh={props.refresh} key={(Math.random() + 1).toString(36).substring(7)} index={fest.id} value={fest[header]} />
              } else if(header === 'Result') {
                return <FestsTableDropdown refresh={props.refresh} key={(Math.random() + 1).toString(36).substring(7)} index={fest.id} value={fest[header]} />
              } else {
                return <td key={(Math.random() + 1).toString(36).substring(7)}>{fest[header]}</td>
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}