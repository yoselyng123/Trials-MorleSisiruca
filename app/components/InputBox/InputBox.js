import styles from './inputBox.module.css';

function InputBox({ value, setValue, placeholder, label }) {
  return (
    <div className={styles.container}>
      <label htmlFor='password' className={styles.labelText}>
        {label}
      </label>
      <input
        type='text'
        placeholder={placeholder}
        id={label}
        className={styles.input}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}

export default InputBox;
