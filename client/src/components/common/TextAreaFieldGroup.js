import React from 'react'
import classnames from "classnames"
import PropTypes from "prop-types"

function TextAreaFieldGroup({
    text,
    name,
    placeholder,
    value,
    error,
    info,
    onChange
}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{text}</label>
            <textarea
                id={name}
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
                {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextAreaFieldGroup.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default TextAreaFieldGroup