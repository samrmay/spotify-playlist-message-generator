import React from 'react'
import SongEntry from './SongEntry'
import TextField from '../TextField'
import LoadingButton from '../LoadingButton'
import {getRedirectURL, getUserId, createPlaylist} from '../../../services/backend'
import styles from './styles.css'

class MockPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlistTitle: '',
            playlistTitleError: false,
            playlistCreated: false,
            playlistCreating: false,
            playlist: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.redirectAuthURL = this.redirectAuthURL.bind(this)
        this.savePlaylistToStorage = this.savePlaylistToStorage.bind(this)
        this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this)
    }

    componentDidMount() {
        if (this.props.userAccessToken) {
            const playlistTitle = localStorage.getItem('playlistTitle')
            if (playlistTitle) {
                this.setState({playlistTitle})
            }
        }
    }

    handleChange(name, value) {
        this.setState({[name]: value, playlistTitleError: false})
    }

    savePlaylistToStorage() {
        let {songs} = this.props
        const {playlistTitle} = this.state

        localStorage.clear()
        localStorage.setItem('playlistTitle', playlistTitle)
        songs = songs.filter(item => item)
        for (let i in songs) {
            localStorage.setItem(`song#${i}`, JSON.stringify(songs[i]))
        }
    }

    async redirectAuthURL() {
        const {authURL} = await getRedirectURL()
        this.savePlaylistToStorage()
        location.href = authURL
    }

    async handleCreatePlaylist() {
        const {userAccessToken, songs} = this.props
        const {playlistTitle} = this.state

        if (playlistTitle == '') {
            this.setState({playlistTitleError: true})
            return
        }

        this.setState({playlistCreating: true})
        const result = await createPlaylist(userAccessToken, songs.map(item => item.track), playlistTitle)
        if (result.href) {
            this.setState({playlist: result, playlistCreated: true, playlistCreating: false})
            localStorage.clear()
        }
    }

    render() {
        const {songs, userAccessToken, handleTrackRefresh} = this.props
        const {playlistTitle, playlistTitleError, playlistCreated, playlist} = this.state
        let songEntryArr = null
        if (songs.length > 0) {
            songEntryArr = []
            for (let i in songs) {
                if (songs[i].track !== null) {
                    songEntryArr.push(
                        <SongEntry 
                            song={songs[i].track} 
                            key={`${songs[i].track.id}${Date.now()}${i}`} 
                            index={i} 
                            refreshEntry={handleTrackRefresh}/>
                    )
                }
            }
        }

        let actionButton = actionButton = <LoadingButton content='allow access' handleClick={this.redirectAuthURL} width='100px'/>
        if (userAccessToken) {
            actionButton = <LoadingButton content='create playlist' handleClick={this.handleCreatePlaylist} width='150px' wasClicked={this.state.playlistCreating}/>
        }

        return(
            <div className={styles.playlistContainer}>
                <div className={styles.playlistTitleContainer}>
                    <TextField 
                        width='300px' 
                        name='playlistTitle'
                        placeholder='my sick new playlist'
                        value={playlistTitle}
                        handleChange={this.handleChange}
                        error={playlistTitleError}/>
                </div>
                <SongEntry header={true} />
                <div className={styles.songsContainer}>
                    {songEntryArr ? songEntryArr : <div>loading...</div>}
                </div>
                {actionButton}
                {playlistCreated ? <div><a href={playlist.external_urls.spotify}>View playlist</a></div> : null}
            </div>
        )
    }
}

export default MockPlaylist