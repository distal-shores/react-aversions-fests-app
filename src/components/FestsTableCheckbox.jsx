import React, { useState } from 'react';
import { GoogleSpreadsheet } from "google-spreadsheet";

export default function FestsTableCheckbox(props) {

    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
    const creds = require('../config/aversions-react-todo-dbf10594a556.json');
    const [isChecked, setIsChecked] = useState(checkBool(props.value));
    function checkBool(string) {
        return string.toLowerCase() === 'false' ? false : true;
    }

    async function updateCell(cellSelector) {
        let cell = 'G' + String(cellSelector + 2);
        try {
            await doc.useServiceAccountAuth(creds);
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
