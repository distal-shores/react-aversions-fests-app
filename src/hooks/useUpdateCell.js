export default function useUpdateCell(event, cellSelector, headerIndex, rowCount, refresh) {

    const colLetter = String.fromCharCode((headerIndex + 1) + 64);
    const cell = colLetter + String(cellSelector + 2);
    const cellSpan = colLetter + '2:' + colLetter + rowCount;
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);

    async function updateCell(event, cell, cellSpan) {
        try {
            await doc.useServiceAccountAuth({
                client_email: process.env.REACT_APP_CLIENT_EMAIL,
                private_key: process.env.REACT_APP_GSHEET_API_KEY.replace(/\n/g, '\n'),
            });
            await doc.loadInfo();
            const sheet = doc.sheetsById[process.env.REACT_APP_PAGE_ID];
            await sheet.loadCells(cellSpan);
            const gotCell = sheet.getCellByA1(cell);
            gotCell.value = event.target.value;
            await sheet.saveUpdatedCells();
            refresh();
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    return updateCell(event, cell, cellSpan);
}