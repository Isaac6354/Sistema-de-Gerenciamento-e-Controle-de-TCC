import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';


const Select = ({ name, label, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map(option => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <div>
        {label && <label htmlFor={fieldName}>{label}</label>}

        <ReactSelect
            defaultValue={defaultValue}
            ref={selectRef}
            classNamePrefix="react-select"
            {...rest}
        />

        {error && <span style={{color: '#f00'}}>{error}</span>}
    </div>
  );
};

export default Select;