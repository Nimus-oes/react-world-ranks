import styles from "./Checkbox.module.css";

interface CheckboxProp {
  labelText: string;
  wrapperClass?: string;
  nativeClass?: string;
  customClass?: string;
  textClass?: string;
  customCheckmark?: React.ReactElement;
  checked: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Checkbox({
  labelText,
  wrapperClass = "",
  nativeClass = "",
  customClass = "",
  textClass = "",
  customCheckmark,
  checked,
  onChange,
  disabled,
}: CheckboxProp) {
  const defaultCheckmark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="17px"
      width="17px"
      viewBox="0 -960 960 960"
      fill="#FFFFFF"
    >
      <path d="M382-221.91 135.91-468l75.66-75.65L382-373.22l366.43-366.43L824.09-664 382-221.91Z" />
    </svg>
  );

  return (
    <label className={`${styles.checkboxWrapper} ${wrapperClass}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.nativeCheckbox} ${nativeClass}`}
      />
      <span className={`${styles.customCheckbox} ${customClass}`}>
        {checked && (customCheckmark ?? defaultCheckmark)}
      </span>
      <span className={`${styles.labelText} ${textClass}`}>{labelText}</span>
    </label>
  );
}
