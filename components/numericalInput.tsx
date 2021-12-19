import escapeRegExp, { INPUT_REGEX } from '@/utils/escapeRegExp';
import classNames from 'classnames';
import type { Dispatch, SetStateAction } from 'react';

type NumericalInputProps = {
  value: string | number;
  onChange: Dispatch<SetStateAction<string>>;
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>;

export default function NumericalInput({
  value,
  onChange,
  placeholder,
  ...rest
}: NumericalInputProps) {
  const cachedClassNames = classNames(
    'appearance-none bg-transparent',
    'text-right text-2xl font-normal font-mono',
    'w-full h-10',
    'focus:outline-none',
  );

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || INPUT_REGEX.test(escapeRegExp(nextUserInput))) {
      onChange(nextUserInput);
    }
  };

  return (
    <input
      {...rest}
      className={cachedClassNames}
      value={value}
      onChange={(event) => enforcer(event.target.value.replace(/,/g, '.'))}
      // universal input options
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      // text-specific options
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder={placeholder || '0.0'}
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  );
}
