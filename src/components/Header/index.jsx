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
                <a href={process.env.REDIRECT_URI} className={styles.titleLink}>
                    <h2 className={styles.title}>Playlist-ifier for Spotify</h2>
                </a>
                <LinkBar />
            </div>
        )
    }
}

export default Header