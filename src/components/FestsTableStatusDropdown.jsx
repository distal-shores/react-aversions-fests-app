import React from 'react'

export default function FestsTableStatusDropdown(props) {
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
    async function updateCell(e, cellSelector) {
        let cell = 'D' + String(cellSelector + 2);
        try {
            await doc.useServiceAccountAuth({
                client_email: process.env.REACT_APP_CLIENT_EMAIL,
                private_key: process.env.REACT_APP_GSHEET_API_KEY.replace(/\n/g, '\n'),
            });
            await doc.loadInfo();
            const sheet = doc.sheetsById['421138511'];
            await sheet.loadCells('D2:D30');
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
            <select name="status" id="status" defaultValue={props.value} onChange={(e) => updateCell(e, props.index)}>
                <option value="&nbsp;"></option>
                <option value="SUBMISSIONS CLOSED">SUBMISSIONS CLOSED</option>
                <option value="SUBMISSIONS NOT OPEN YET">SUBMISSIONS NOT OPEN YET</option>
                <option value="SUBMISSIONS NOT OPEN YET">SUBMISSIONS NOT OPEN YET</option>
                <option value="APPLIED">APPLIED</option>
                <option value="EMAILED TO INQUIRE">EMAILED TO INQUIRE</option>
            </select>
        </td>
    )
}
