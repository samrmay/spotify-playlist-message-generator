import React from 'react'
import styles from './styles.css'

class AuthModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
      const {authLink, instructions, linkContent, buttonContent} = this.props

        return (
          <div className={styles.authModalContainer}>
            <div className={styles.authModalWindow}>
              <div className={styles.instructionsContainer}>{instructions}</div>
              <br />
              <div className={styles.optionsContainer}>
                <button onClick={this.props.handleSkip}>{buttonContent}</button>
                <a href={authLink} className={styles.modalContentLink}>
                  {linkContent}
                </a>  
              </div>
            </div>
          </div>
        );
      }
}

export default AuthModal

AuthModal.defaultProps = {
  authLink: 'https://www.google.com',
  instructions: 'instructions',
  linkContent: 'Go to google',
  buttonContent: 'wait until later'
}