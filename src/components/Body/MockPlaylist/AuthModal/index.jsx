import React from 'react'
import styles from './styles.css'

class AuthModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
          <div className={styles.authModalContainer}>
            <div className={styles.authModalWindow}>
              <a href={this.props.authLink} className={styles.modalContentLink}>
                Connect to Spotify
              </a>
              <button onClick={this.props.handleSkip}>wait until later</button>
            </div>
          </div>
        );
      }
}

export default AuthModal