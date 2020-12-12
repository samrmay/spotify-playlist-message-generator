import React from 'react'
import styles from './styles.css'

class SongEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    stringifyArtists(artists) {
        if (artists.length == 0) {
            return artists[0].name
        }
        let result = artists[0].name
        for (let i=1;i<artists.length;i++) {
            result = `${result}, ${artists[i].name}`
        }
        return result
    }

    render() {
        if (!this.props.header) {
            const {song} = this.props
            const {name, artists} = song
            const artistsString = this.stringifyArtists(artists)
            return(
            <div className={styles.songEntryContainer}>
                <div className={styles.songName}>{name}</div>
                <div className={styles.artistsString}>{artistsString}</div>
            </div>
            )
        } else {
            return(
                <div className={styles.headerContainer}>
                    <div className={styles.songName}>Title</div>
                    <div className={styles.artistsString}>Artists</div>
                </div>
            )
        }
    }
}

export default SongEntry

SongEntry.defaultProps = {
    header: false,
}