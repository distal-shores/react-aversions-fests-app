import React from 'react';
import FestsTableResultDropdown from './FestsTableResultDropdown.jsx';
import FestsTableStatusDropdown from './FestsTableStatusDropdown.jsx';
import FestsTableCheckbox from './FestsTableCheckbox.jsx';
import { Table } from 'react-bulma-components';

export default function FestsTable(props) {
  function checkSearchTerm(fest) {
    if(fest.Name.toLowerCase().includes(props.searchTerm.toLowerCase())) {
      return fest;
    } else if (fest.City.toLowerCase().includes(props.searchTerm.toLowerCase())) {
      return fest;
    }
  }
  return (
    <Table className="festList">
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
          <tr key={'tableRow' + index}  >
            {props.headers.map((header, headerIndex) => {
              if (header === 'Response') {
                return <FestsTableCheckbox 
                  refresh={props.refresh} 
                  key={'tableCell' + fest.id + header} 
                  index={fest.id} 
                  value={fest[header]} 
                />
              } else if(header === 'Result') {
                return <FestsTableResultDropdown 
                  refresh={props.refresh} 
                  key={'tableCell' + fest.id + header} 
                  index={fest.id}
                  value={fest[header]}
                  headerIndex={headerIndex}
                  rowCount={props.rowCount}
                />
              } else if(header === 'Status') {
                return <FestsTableStatusDropdown 
                  refresh={props.refresh} 
                  key={'tableCell' + fest.id + header} 
                  index={fest.id} 
                  value={fest[header]}
                  headerIndex={headerIndex}
                  rowCount={props.rowCount}
                />
              } else {
                return <td 
                  key={'tableCell' + fest.id + header}
                >
                  {fest[header]}
                </td>
              }
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}