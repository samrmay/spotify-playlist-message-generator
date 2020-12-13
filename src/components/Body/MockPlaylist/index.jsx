import React from 'react'
import SongEntry from './SongEntry'
import TextField from '../TextField'
import styles from './styles.css'

class MockPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlistTitle: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.redirectAuthURL = this.redirectAuthURL.bind(this)
        this.savePlaylistToStorage = this.savePlaylistToStorage.bind(this)
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
        const {songs} = this.props
        const {playlistTitle} = this.state

        localStorage.clear()
        localStorage.setItem('playlistTitle', playlistTitle)
        for (let i in songs) {
            localStorage.setItem(`song#${i}`, JSON.stringify(songs[i]))
        }
    }

    redirectAuthURL() {
        let authURL = `${process.env.SPOTIFY_ACCOUNTS}authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}`
        const scopes = 'scope=playlist-modify-private'
        const responseType = 'response_type=token'
        const redirect = `redirect_uri=${process.env.REDIRECT_URI}`
        authURL += `&${scopes}&${responseType}&${redirect}`
        this.savePlaylistToStorage()
        location.href = authURL
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

        let actionButton = actionButton = <button onClick={this.redirectAuthURL}>Allow access</button>
        if (userAccessToken) {
            actionButton = <button onClick={this.createPlaylist}>Create playlist</button>
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
            </div>
        )
    }
}

export default MockPlaylist