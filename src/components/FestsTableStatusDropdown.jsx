import React from 'react';
import { Form } from 'react-bulma-components';
import useUpdateCell from '../hooks/useUpdateCell';

export default function FestsTableStatusDropdown(props) {
    const { Select } = Form;
    return (
        <td key={'festStatusDropdown' + props.index}>
            <Select 
                name="status" 
                id="status" 
                defaultValue={props.value} 
                onChange={(e) => useUpdateCell(e, props.index, props.headerIndex, props.rowCount, props.refresh)}
                rounded={true}
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