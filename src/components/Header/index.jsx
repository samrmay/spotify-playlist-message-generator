import React from 'react'
import LinkBar from './LinkBar'
import styles from './styles.css'

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.header}>
                <h2 className={styles.title}>Playlist-ifier for Spotify</h2>
                <LinkBar />
            </div>
        )
    }
}

export default Header