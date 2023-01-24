import React from 'react';
import { GoogleSpreadsheet } from "google-spreadsheet";

export default function FestsTableDropdown(props) {
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
    async function updateCell(e, cellSelector) {
        let cell = 'H' + String(cellSelector + 2);
        try {
            await doc.useServiceAccountAuth({
                client_email: process.env.REACT_APP_CLIENT_EMAIL,
                private_key: process.env.REACT_APP_GSHEET_API_KEY.replace(/\n/g, '\n'),
            });
            await doc.loadInfo();
            const sheet = doc.sheetsById['421138511'];
            await sheet.loadCells('H2:H30');
            const gotCell = sheet.getCellByA1(cell);
            gotCell.value = e.target.value;
            await sheet.saveUpdatedCells();
            props.refresh();
        } catch (e) {
            console.error('Error: ', e);
        }
    };
    return (
        <td key={(Math.random() + 1).toString(36).substring(7)}>
            <select name="result" id="result" defaultValue={props.value} onChange={(e) => updateCell(e, props.index)}>
                <option value="&nbsp;"></option>
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
                <option value="N/A">N/A</option>
            </select>
        </td>
    )
}
