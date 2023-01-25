import React, { useState }  from 'react';
import useGoogleSheets from 'use-google-sheets';
import FestsTable from './FestsTable';
import FestsFilters from './FestsFilters';
import FestsSearch from './FestsSearch';
import { Container } from 'react-bulma-components';

export default function Dashboard() {
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
    
        const fests = data[0].data;
        fests.forEach((fest, i) => {
            fest.id = i;
        });
        const rowCount = fests.length;
        const { id, ...headerNames } = fests[0];
        const headers = Object.keys(headerNames);
    
        function festsFiltered(term) {
          if (filter === 'all') {
            return fests;
          } else if (filter === 'active') {
            return fests.filter((fest) => (
              fest.Status === 'APPLIED' ||
              fest.Status === 'EMAILED TO INQUIRE'
            ));
          } else if (filter === 'inactive') {
            return fests.filter((fest) => (
              (fest.Status === 'SUBMISSIONS CLOSED' && fest.Result === 'N/A') || 
              (fest.Status === 'SUBMISSIONS CLOSED' && fest.Result === 'Declined') || 
              fest.Result === 'Declined'
            ));
          } else if (filter === 'upcoming') {
            return fests.filter((fest) => (
              fest.Status === 'SUBMISSIONS NOT OPEN YET'
            ));
          } else if (filter === 'response') {
            return fests.filter((fest) => (
              fest.Response === 'TRUE'
            ));
          } else if (filter === 'no_response') {
            return fests.filter((fest) => (
              fest.Response === 'FALSE'
            ));
          } 
        }
    
        return (
          <Container>
            <FestsFilters
              filter={filter}
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
          </Container>
        );
    }
}
