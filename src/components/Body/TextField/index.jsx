import React from 'react';
import styles from './styles.css';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleChange(this.props.name, event.target.value);
  }

  render() {
    const { height, width, value, placeholder, isPassword, error } = this.props;
    const style = {height}
    if (error) {
      style.borderColor = 'red'
    }
    return (
      <div className={styles.textFieldContainer} style={{ height, width }}>
        <textarea
          className={styles.textInput}
          style={style}
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange}
          type={isPassword ? 'password' : 'text'}
        />
      </div>
    );
  }
}

TextField.defaultProps = {
  handleChange: (name, value) => '',
  height: 20,
  width: '100%',
  value: '',
  name: '',
  isPassword: false,
  error: false,
  multiLine: false
};

export default TextField;
