import React from 'react'
import classnames from "classnames"
import PropTypes from "prop-types"

function InputGroup({
    text,
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange
}) {
    return (
        <div className="input-group mb-3">
        <label htmlFor={name}>{text}</label>
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon}></i>
            </span>
        </div>
            <input
                id={name}
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

InputGroup.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
    type: "text"
}
export default InputGroup