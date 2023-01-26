import React from 'react';
import { Form } from 'react-bulma-components';
import useUpdateCell from '../hooks/useUpdateCell';

export default function FestsTableDropdown(props) {
    const { Select } = Form;
    return (
        <td key={'festResultDropdown' + props.index}>
            <Select 
                name="result" 
                id="result" 
                defaultValue={props.value} 
                onChange={(e) => useUpdateCell(e, props.index, props.headerIndex, props.rowCount, props.refresh)}
                rounded={true}
                size="small"
                color="text"
            >
                <option value="&nbsp;"></option>
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
                <option value="N/A">N/A</option>
            </Select>
        </td>
    )
}
