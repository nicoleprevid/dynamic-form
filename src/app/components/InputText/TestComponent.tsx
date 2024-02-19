import { useState } from 'react';
import InputText, { Props } from '.';

export default function TestComponent({
  label,
  disabled,
  required,
  placeholder,
  error,
  messageError,
}: Omit<Props, 'onChange' | 'value'>) {
  const [inputValue, setInputValue] = useState('');

  return (
    <InputText
      disabled={disabled}
      label={label}
      required={required}
      placeholder={placeholder}
      error={error}
      messageError={messageError}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
