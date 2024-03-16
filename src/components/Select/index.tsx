import {
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useCallback,
} from "react";
import useClickOutside from "./useClickOutside";
import s from "./Select.module.scss";

export type SelectValueType = string | number | Record<string, any> | null;

type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ""
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

interface Props<T extends SelectValueType> {
  value: T | string;
  setValue: Dispatch<SetStateAction<T>>;
  valueKey?: Leaves<T>;
  values: Array<T>;
  disabled?: boolean;
  placeholder?: string;
  errorText?: string;
  search?: ((value: string) => void) | boolean;
}

export const Select = <T extends SelectValueType>({
  value,
  setValue,
  valueKey,
  values,
  placeholder,
  errorText = "Text dosn`t match with avalible values",
  disabled,
  search = true,
}: Props<T>): JSX.Element => {
  const getValue = useCallback(
    (value: SelectValueType): string =>
      typeof value === "string" || typeof value === "number"
        ? `${value}`
        : value && valueKey
        ? `${valueKey
            .split(".")
            .reduce((acc, currentKey) => acc && acc[currentKey], value as any)}`
        : "",
    [valueKey]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState(getValue(value));
  const [filteredValues, setFilteredValues] = useState(values);
  const wrapperRef = useClickOutside(() => {
    setIsOpen(false);
    if (!values.find((value) => getValue(value) === inputValue)) {
      setError(errorText);
    } else {
      setFilteredValues(values);
    }
  });

  useEffect(() => {
    setInputValue(getValue(value));
  }, [value, getValue]);

  useEffect(() => {
    setFilteredValues(values);
  }, [values]);

  return (
    <div
      className={`${s.main} ${isOpen ? s.isOpen : ""} ${
        error ? s.isError : ""
      } ${disabled ? s.isDisabled : ""}`}
      ref={wrapperRef}
    >
      <div className={s.main_input} onClick={() => setIsOpen((p) => !p)}>
        <input
          onChange={(e) => {
            const text = e.target.value;
            const value = values.find((value) => getValue(value) === text);

            setIsOpen(true);
            setInputValue(text);
            setFilteredValues(
              values.filter((value) => getValue(value).includes(text))
            );

            if (value) {
              setValue(value);
              setError("");
            }

            if (typeof search === "function") search(text);
          }}
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue}
          type={search ? "text" : "button"}
        />
      </div>
      {error && <p className={s.main_error}>{error}</p>}
      {!!values.length && (
        <div className={s.main_dropdown}>
          {filteredValues.length ? (
            <ul className={s.main_list}>
              {filteredValues.map((val, index) => (
                <li key={index}>
                  <button
                    className={`${s.main_button} ${
                      getValue(val) === inputValue ? s.active : ""
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      setValue(val);
                      setInputValue(getValue(val));
                      setFilteredValues(values);
                      setError("");
                    }}
                    type="button"
                  >
                    {getValue(val)}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className={s.main_empty}>Нічого не знайдено</div>
          )}
        </div>
      )}
    </div>
  );
};
