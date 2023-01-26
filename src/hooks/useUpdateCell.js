import { useState } from 'react';

function useUpdateCell(props) {

    const[cellColumn, setCellColumn] = useState('');
    const[cellIndex, setCellIndex] = useState(0);
    const[cell, setCell] = useState('');
    const[cellSpan, setCellSpan] = useState('');
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);

    async function updateCell(e, cellIndex, cellColumn, cellSpan) {
        setCell(cellColumn + String(cellIndex + 2));
        setCellColumn(cellColumn);
        setCellIndex(cellIndex);
        setCellSpan(cellColumn + '2:' + cellColumn + String(props.rowCount));
        try {
            await doc.useServiceAccountAuth({
                client_email: process.env.REACT_APP_CLIENT_EMAIL,
                private_key: process.env.REACT_APP_GSHEET_API_KEY.replace(/\n/g, '\n'),
            });
            await doc.loadInfo();
            const sheet = doc.sheetsById[process.env.REACT_APP_PAGE_ID];
            await sheet.loadCells(cellSpan);
            const gotCell = sheet.getCellByA1(cell);
            gotCell.value = e.target.value;
            await sheet.saveUpdatedCells();
            props.refresh();
        } catch (e) {
            console.error('Error: ', e);
        }
    }

    updateCell(props.e, cell, cellSpan);
}

export default useUpdateCell;