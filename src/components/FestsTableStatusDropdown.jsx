import React from 'react';
import { Form } from 'react-bulma-components';

export default function FestsTableStatusDropdown(props) {
    const { Select } = Form;
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
    async function updateCell(e, cellSelector, headerIndex) {
        const colLetter = String.fromCharCode((headerIndex + 1) + 64);
        const cell = colLetter + String(cellSelector + 2);
        const cellSpan = colLetter + '2:' + colLetter + props.rowCount;
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
    };
    return (
        <td key={'festStatusDropdown' + props.index}>
            <Select 
                name="status" 
                id="status" 
                defaultValue={props.value} 
                onChange={(e) => updateCell(e, props.index, props.headerIndex)}
                size="small"
                color="text"
            >
                <option value="&nbsp;"></option>
                <option value="SUBMISSIONS CLOSED">SUBMISSIONS CLOSED</option>
                <option value="SUBMISSIONS NOT OPEN YET">SUBMISSIONS NOT OPEN YET</option>
                <option value="SUBMISSIONS NOT OPEN YET">SUBMISSIONS NOT OPEN YET</option>
                <option value="APPLIED">APPLIED</option>
                <option value="EMAILED TO INQUIRE">EMAILED TO INQUIRE</option>
            </Select>
        </td>
    )
}