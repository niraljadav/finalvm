import React from 'react'
import classnames from "classnames"
import PropTypes from "prop-types"

function InputGroup({
    id,
    label,
    errors,
    type,
    name,
    onChange,
    value
}) {


    return (
        <div className="form-group col-md-6">
            <label htmlFor={id}>{label}</label>
            <span className="float-right"><i className="fas fa-calendar"></i></span>
            <input
                type={type}
                required="required"
                name={name}
                className={classnames("form-control", {
                    "is-invalid": errors
                })}
                id={id}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

InputGroup.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}
export default InputGroup