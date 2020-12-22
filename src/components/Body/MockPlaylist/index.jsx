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
            playlistCreated: false,
            playlistCreating: false
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
        this.setState({[name]: value})
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
        this.setState({playlistCreating: true})
        const result = await createPlaylist(userAccessToken, songs, playlistTitle)
        if (result.href) {
            this.setState({playlistCreated: true, playlist: result.playlist, playlistCreating: false})
            localStorage.clear()
        }
    }

    render() {
        const {songs, userAccessToken} = this.props
        let songEntryArr = null
        if (songs.length > 0) {
            songEntryArr = []
            for (let i in songs) {
                if (songs[i] !== null) {
                    songEntryArr.push(<SongEntry song={songs[i]} key={i}/>)
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
                        value={this.state.playlistTitle}
                        handleChange={this.handleChange}/>
                </div>
                <SongEntry header={true} />
                <div className={styles.songsContainer}>
                    {songEntryArr ? songEntryArr : <div>loading...</div>}
                </div>
                {actionButton}
                {this.state.playlistCreated ? <div>playlist created</div> : null}
            </div>
        )
    }
}

export default MockPlaylist