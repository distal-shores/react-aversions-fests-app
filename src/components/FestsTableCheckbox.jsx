import React, { useState } from 'react';

export default function FestsTableCheckbox(props) {
    
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
    const [isChecked, setIsChecked] = useState(checkBool(props.value));
    function checkBool(string) {
        return string.toLowerCase() === 'false' ? false : true;
    }

    async function updateCell(cellSelector) {
        let cell = 'G' + String(cellSelector + 2);
        try {
            await doc.useServiceAccountAuth({
                client_email: process.env.REACT_APP_CLIENT_EMAIL,
                private_key: process.env.REACT_APP_GSHEET_API_KEY.replace(/\n/g, '\n'),
            });
            await doc.loadInfo();
            const sheet = doc.sheetsById['421138511'];
            await sheet.loadCells('G2:G30');
            const gotCell = sheet.getCellByA1(cell);
            gotCell.value = !isChecked;
            await sheet.saveUpdatedCells();
            setIsChecked(!isChecked);
            props.refresh();
        } catch (e) {
            console.error('Error: ', e);
        }
    };
    return (
        <td key={(Math.random() + 1).toString(36).substring(7)}>
            <input type="checkbox" defaultChecked={isChecked} onChange={() => updateCell(props.index)}/>
        </td>
    )
}
