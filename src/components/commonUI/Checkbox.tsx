import styles from "./Checkbox.module.css";

interface CheckboxProp {
  id: string;
  labelText: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  customCheckmark?: React.ReactElement<SVGElement>;
  wrapperClass?: string;
  nativeClass?: string;
  customClass?: string;
  textClass?: string;
}

export default function Checkbox({
  id,
  labelText,
  checked,
  onChange,
  disabled,
  customCheckmark,
  wrapperClass = "",
  nativeClass = "",
  customClass = "",
  textClass = "",
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
    <label className={`${styles.wrapper} ${wrapperClass}`}>
      <input
        type="checkbox"
        id={id}
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
