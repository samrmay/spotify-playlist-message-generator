import React from 'react'
import SongEntry from './SongEntry'
import AuthModal from './AuthModal'
import ShareMenu from './ShareMenu'
import TextField from '../TextField'
import LoadingButton from '../LoadingButton'
import {getRedirectURL, createPlaylist} from '../../../services/backend'
import styles from './styles.css'

class MockPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlistTitle: '',
            playlistTitleError: false,
            playlistCreated: false,
            playlistCreating: false,
            playlist: null,
            authURL: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.savePlaylistToStorage = this.savePlaylistToStorage.bind(this)
        this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this)
        this.showAuthModal = this.showAuthModal.bind(this)
        this.handleModalSkip = this.handleModalSkip.bind(this)
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
            console.log(result)
            this.setState({playlist: result, playlistCreated: true, playlistCreating: false})
            localStorage.clear()
        }
    }
    
    async showAuthModal() {
        const {authURL} = await getRedirectURL()
        this.savePlaylistToStorage()
        this.setState({authURL})
    }

    handleModalSkip() {
        this.setState({authURL: null})
    }

    render() {
        const {songs, userAccessToken, handleTrackRefresh} = this.props
        const {playlistTitle, playlistTitleError, playlistCreated, playlist, authURL} = this.state
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

        let actionButton = <LoadingButton content='save playlist' handleClick={this.showAuthModal} width='100px'/>
        if (userAccessToken) {
            actionButton = <LoadingButton content='create playlist' handleClick={this.handleCreatePlaylist} width='150px' wasClicked={this.state.playlistCreating}/>
        }

        return(
            <div className={styles.playlistContainer}>
                {authURL ? 
                    <AuthModal 
                        authLink={authURL} 
                        handleSkip={this.handleModalSkip}
                        instructions="We need to connect to Spotify to create your playlist.
                        Alternatively feel free to search messages for fun, or manually create a playlist
                        based on results."
                        linkContent='Connect to Spotify'
                        buttonContent="eh i'd rather not"/> : null}

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

                {playlistCreated ? <ShareMenu playlist={playlist}/> : null}
            </div>
        )
    }
}

export default MockPlaylist