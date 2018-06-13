import React, { Component } from 'react';

import {
  FieldContainer,
  FieldLabel,
  FieldInput,
} from '@keystonejs/ui/src/primitives/fields';

import { Select } from '@keystonejs/ui/src/primitives/forms';

const selectStyles = {
  menuPortal: provided => ({ ...provided, zIndex: 2 }),
};

export default class SelectField extends Component {
  onChange = option => {
    const { field, onChange } = this.props;
    onChange(field, option ? option.value : null);
  };
  render() {
    const { autoFocus, field, item, renderContext } = this.props;
    const value = field.options.filter(i => i.value === item[field.path])[0];
    const htmlID = `ks-input-${field.path}`;

    const selectProps =
      renderContext === 'dialog'
        ? {
            menuPosition: 'fixed',
            menuShouldBlockScroll: true,
          }
        : null;

    return (
      <FieldContainer>
        <FieldLabel htmlFor={htmlID}>{field.label}</FieldLabel>
        <FieldInput>
          <Select
            autoFocus={autoFocus}
            value={value}
            options={field.options}
            onChange={this.onChange}
            inputId={htmlID}
            styles={selectStyles}
            {...selectProps}
          />
        </FieldInput>
      </FieldContainer>
    );
  }
}