import { useCallback, useMemo, useState } from 'react';

export function useInput(initial: string | number | boolean = '') {
  const stringified = initial.toString();
  const [value, setValue] = useState<string>(stringified);
  const onChange = useCallback((e) => setValue(e.target.value), []);

  const clear = useCallback(() => setValue(''), []);

  return useMemo(
    () => ({
      value,
      setValue,
      hasValue: value !== undefined && value !== null && value.trim() !== '',
      clear,
      onChange,
      eventBind: {
        onChange,
        value,
      },
      valueBind: {
        onChange: setValue,
        value,
      },
    }),
    [clear, onChange, value],
  );
}

export default useInput;
