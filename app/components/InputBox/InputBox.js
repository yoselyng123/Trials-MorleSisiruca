import styles from './inputBox.module.css';

function InputBox({
  value,
  setValue,
  placeholder,
  label,
  disabled,
  isTextArea,
  overWriteStyle,
  overWriteStyleContainer,
}) {
  return (
    <div className={styles.container} style={overWriteStyleContainer}>
      {label && (
        <label htmlFor={label} className={styles.labelText}>
          {label}
        </label>
      )}
      {isTextArea ? (
        <textarea
          rows={10}
          cols={40}
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <input
          type='text'
          placeholder={placeholder}
          id={label}
          className={styles.input}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          disabled={disabled}
          style={overWriteStyle}
        />
      )}
    </div>
  );
}

export default InputBox;
