import React from 'react';
import Loading from '../../../assets/loading.svg';
import styles from './styles.css';

class LoadingButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      this.props.handleClick()
    }
  } 

  render() {
    const {height, width, fontSize, SVG, handleClick, wasClicked, content, backgroundColor} = this.props
    const style = {height, width, fontSize}

    const messageContent = SVG ? <div><SVG width='15px' alt={content}/></div> : <h5 className={styles.loadingButtonText}>{content}</h5>

    return (
      <div 
        className={`${styles.loadingButton} ${styles[`loadingButton${backgroundColor}`]}`} 
        onClick={handleClick} 
        style={style}
        role='button'
        tabIndex='0'
        onKeyPress={this.handleKeyPress}>
        {wasClicked ? (
          <Loading 
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
  handleClick: () => '',
  width: '100%',
  height: '50px',
  fontSize: '20px',
  SVG: null,
  backgroundColor: 'Black'
};

export default LoadingButton;