import React from 'react'
import LoadingButton from '../../LoadingButton'
import refreshIcon from '../../../../assets/refreshIcon.svg'
import styles from './styles.css'

class SongEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false
        }
        this.handleRefresh = this.handleRefresh.bind(this)
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

    handleRefresh() {
        this.setState({refreshing: true})
        this.props.refreshEntry(this.props.index)
    }

    render() {
        if (!this.props.header) {
            const {song, border} = this.props
            const {name, artists, album} = song
            const albumLink = album.images[2].url
            const externalLink = song.external_urls.spotify
            const artistsString = this.stringifyArtists(artists)
            return(
            <div className={styles.rootContainer}>
                <div className={styles.songEntryContainer}>
                    <div className={styles.coverContainer}>
                        <a href={externalLink} target='_blank'><img src={albumLink} alt='loading...'/></a>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.songName}>{name}</div>
                        <div className={styles.artistsString}>
                            {artistsString}
                            <LoadingButton 
                                content='new song' 
                                handleClick={this.handleRefresh}
                                width='20px'
                                height='20px'
                                fontSize='16px'
                                SVG={refreshIcon}
                                backgroundColor='White'
                                wasClicked={this.state.refreshing}/>
                        </div>
                    </div>
                </div>
                {border ? <hr className={styles.border}/> : null}
            </div>
            )
        } else {
            return(
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        <h4 className={styles.songName}>Title</h4>
                        <div className={styles.artistsString}>
                            <h4 className={styles.headerText}>Artists</h4>
                            <h4 className={styles.headerText}>new song</h4>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SongEntry

SongEntry.defaultProps = {
    header: false,
    index: -1,
    refreshEntry: () => {},
    border: true
}