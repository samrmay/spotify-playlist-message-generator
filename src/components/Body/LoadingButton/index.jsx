import React from 'react';
import Loading from '../../../assets/loading.svg';
import styles from './styles.css';

class LoadingButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {height, width, fontSize, SVG, handleClick, wasClicked, content, backgroundColor} = this.props
    const style = {height, width, fontSize, backgroundColor}

    const messageContent = SVG ? <div><SVG width='15px' alt={content}/></div> : <h5 className={styles.loadingButtonText}>{content}</h5>

    return (
      <div className={styles.loadingButton} onClick={handleClick} style={style}>
        {wasClicked ? (
          <Loading 
            className={styles.loadingButtonAnimation} 
            alt="Loading..."
            width={height} />
        ) : (
          messageContent
        )}
      </div>
    );
  }
}

LoadingButton.defaultProps = {
  content: 'Loading Button',
  wasClicked: false,
  handleClick: (event) => '',
  width: '100%',
  height: '50px',
  fontSize: '20px',
  SVG: null,
  backgroundColor: 'black'
};

export default LoadingButton;