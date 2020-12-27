import React from 'react'
import styles from './styles.css'

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.header}>
                <h2 className={styles.title}>Playlist Message Generator for Spotify ;)</h2>
            </div>
        )
    }
}

export default Header