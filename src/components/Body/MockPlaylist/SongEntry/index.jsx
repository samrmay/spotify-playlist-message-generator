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
            const {song} = this.props
            const {name, artists} = song
            const artistsString = this.stringifyArtists(artists)
            return(
            <div className={styles.songEntryContainer}>
                <div className={styles.songName}>{name}</div>
                <div className={styles.artistsString}>
                    {artistsString}
                    <LoadingButton 
                        content='new song' 
                        handleClick={this.handleRefresh}
                        width='35px'
                        height='20px'
                        fontSize='16px'
                        SVG={refreshIcon}
                        backgroundColor='darkgray'
                        wasClicked={this.state.refreshing}/>
                </div>
            </div>
            )
        } else {
            return(
                <div className={styles.headerContainer}>
                    <div className={styles.songName}>Title</div>
                    <div className={styles.artistsString}>Artists<div>new song</div></div>
                </div>
            )
        }
    }
}

export default SongEntry

SongEntry.defaultProps = {
    header: false,
    index: -1,
    refreshEntry: () => {}
}