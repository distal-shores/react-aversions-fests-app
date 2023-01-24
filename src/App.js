import './App.css';
import useGoogleSheets from 'use-google-sheets';
import FestsTable from './components/FestsTable';
import FestsFilters from './components/FestsFilters';
import FestsSearch from './components/FestsSearch';
import React, { useState  }  from 'react';

function App() {
  const { data, loading, error, refetch, called } = useGoogleSheets({
    apiKey: process.env.REACT_APP_API_KEY,
    sheetId: process.env.REACT_APP_SHEET_ID,
    sheetsOptions: [
      { 
        id: 'Festivals 2023' 
      }
    ],
  });

  const[filter, setFilter] = useState('all');
  const[searchTerm, setSearchTerm] = useState('');

  function refresh() {
    refetch();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  if (called) {
    const festData = data[0].data;
    const { id, ...headerNames } = festData[0];
    const headers = Object.keys(headerNames);
    festData.forEach((fest, i) => {
      fest.id = i;
    });
    function festsFiltered(term) {
      if (filter === 'all') {
        return festData;
      } else if (filter === 'active') {
        return festData.filter((fest) => (
          fest.Status === 'APPLIED' ||
          fest.Status === 'EMAILED TO INQUIRE'
        ));
      } else if (filter === 'inactive') {
        return festData.filter((fest) => (
          fest.Status === 'SUBMISSIONS CLOSED' && fest.Result === 'N/A' || 
          fest.Status === 'SUBMISSIONS CLOSED' && fest.Result === 'Declined' || 
          fest.Result === 'Declined'
        ));
      } else if (filter === 'upcoming') {
        return festData.filter((fest) => (
          fest.Status === 'SUBMISSIONS NOT OPEN YET'
        ));
      } else if (filter === 'response') {
        return festData.filter((fest) => (
          fest.Response === 'TRUE'
        ));
      } else if (filter === 'no_response') {
        return festData.filter((fest) => (
          fest.Response === 'FALSE'
        ));
      } 
    }

    return (
      <div className="container">
        <FestsFilters
          setFilter={setFilter}
          festsFiltered={festsFiltered}
          setSearchTerm={setSearchTerm}
          refresh={refresh}
        />
        <FestsSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <FestsTable 
          festsFiltered={festsFiltered}
          searchTerm={searchTerm}
          headers={headers}
          refresh={refresh}
        />
      </div>
    );
  }
}

export default App;