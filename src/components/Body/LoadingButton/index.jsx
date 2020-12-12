import React from 'react';
import Loading from '../../../assets/loading.svg';
import styles from './styles.css';

class LoadingButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {width: this.props.width}
    return (
      <div className={styles.loadingButton} onClick={this.props.handleClick} style={style}>
        {this.props.wasClicked ? (
          <Loading className={styles.loadingButtonAnimation} alt="Loading..." />
        ) : (
          <h5 className={styles.loadingButtonText}>{this.props.content}</h5>
        )}
      </div>
    );
  }
}

LoadingButton.defaultProps = {
  content: 'Loading Button',
  wasClicked: false,
  handleClick: (event) => '',
  width: '100%'
};

export default LoadingButton;