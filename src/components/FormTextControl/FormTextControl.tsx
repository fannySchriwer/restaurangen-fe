import React from 'react';

interface IProps {
  htmlFor: string;
  label: string;
  touched: boolean | number;
  valid: boolean | number;
  error: string;
  name: string;
  value: string;
  id: string;
  onChange: any;
  onBlur: any;
}

export const FormTextControl = (props: IProps) => {
  const {
    htmlFor,
    label,
    touched,
    valid,
    error
  } = props;

  return (
    <>
      <div>
        <label htmlFor={htmlFor}>{label}</label>
        <input {...props} />
      </div>

      <div style={{ height: "20px" }}>
        {touched && !valid ? <small>{error}</small> : null}
      </div>
    </>
  )
}
