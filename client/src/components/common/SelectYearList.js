import React from 'react'
import PropTypes from "prop-types"

function getYearList() {
    const year = new Date().getFullYear();
    return (
        Array.from(new Array(50), (v, i) =>
            <option key={i} value={year + i}>{year + i}</option>
        )
    );
};
function SelectMonthList({
    name,
    onChange,
    value
}) {
    
    return (
        <select onChange={onChange} value={value} name={name} className="btn btn-md btn-dark mr-2">
            {getYearList()}
        </select>
    )
}

SelectMonthList.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}
export default SelectMonthList