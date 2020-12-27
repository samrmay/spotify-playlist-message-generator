import React from 'react'
import styles from './styles.css'

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.footer}>
                A mini project by Sam May.
                <a 
                    href='https://github.com/samrmay/spotify-playlist-message-generator'
                    className={styles.link}> 
                    https://github.com/samrmay/spotify-playlist-message-generator
                </a>
            </div>
        )
    }
}

export default Footer