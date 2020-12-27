import React from 'react';
import styles from './styles.css';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
  }

  handleFocusBlur(event) {
    const { type } = event;
    this.setState({ isFocused: type == 'blur' ? false : true });
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
          onFocus={this.handleFocusBlur}
          onBlur={this.handleFocusBlur}
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
  error: false
};

export default TextField;
