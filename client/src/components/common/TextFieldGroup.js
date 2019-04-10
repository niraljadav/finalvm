import React from 'react'
import classnames from "classnames"
import PropTypes from "prop-types"

function TextFieldGroup({
    text,
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
})  {
    return (
        <div className="form-group">
            <label htmlFor={name}>{text}</label>
            <input
                id={name}
                type={type}
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled} />
                {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextFieldGroup.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
    type: "text"
}

export default TextFieldGroup