import React from 'react'
import MockPlaylist from './MockPlaylist'
import TextField from './TextField'
import LoadingButton from './LoadingButton'
import {parseSequence} from '../../services/spotify'
import {getWordEntry, getSingleTrack} from '../../services/backend'
import styles from './styles.css'

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            accessToken: '',
            spotifyQueried: false,
            trackObjs: [],
            goClicked: false,
            userAccessToken: null,
            messageError: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.searchMessage = this.searchMessage.bind(this)
        this.handleTrackRefresh = this.handleTrackRefresh.bind(this)
    }

    componentDidMount() {
        if (window.location.hash) {
            const userAccessToken = window.location.hash.match(/access_token=(.+)&token_type/)[1]
            const trackObjs = []
            let i = 0
            while (true) {
                const song = JSON.parse(localStorage.getItem(`song#${i}`))
                if (song) {
                    trackObjs.push(song)
                } else {
                    break
                }
                i += 1
            }

            this.setState({userAccessToken})
            if (trackObjs.length > 0) {
                this.setState({trackObjs, spotifyQueried: true})
            }

            const message = localStorage.getItem('message')
            if (message) {
                this.setState({message})
            }
        }
    }

    handleChange(name, value) {
        this.setState({[name]: value, messageError: false})
        if (name == 'message') {
            this.setState({spotifyQueried: false})
        }
    }

    handleReset() {
        this.setState({message: '', trackObjs: [], spotifyQueried: false})
    }

    async searchWord(word) {
        const entry = await getWordEntry(word)
        return getSingleTrack(entry || '')
    }

    async handleTrackRefresh(index) {
        const {trackObjs} = this.state
        const {word} = trackObjs[index]
        const newTrack = await this.searchWord(word)
        trackObjs.splice(index, 1, {word, track: newTrack})
        this.setState({trackObjs})
    }

    async searchMessage() {
        // Check for empty message
        if (this.state.message == '') {
            this.setState({messageError: true})
            return
        }

        localStorage.clear()
        this.setState({trackObjs: [], spotifyQueried: true, goClicked: true})
        const message = parseSequence(this.state.message)
        const trackPromises = message.map(item => this.searchWord(item))
        const tracks = await Promise.all(trackPromises)
        const trackObjs = tracks.map((item, index) => {return {track: item, word: message[index]}})
        this.setState({trackObjs, goClicked: false})
    }

    render() {
        const {spotifyQueried, trackObjs, message, userAccessToken, messageError} = this.state
        return(
            <div className={styles.bodyContainer}>
                <div className={styles.inputContainer}>
                    <TextField 
                        handleChange={this.handleChange} 
                        name='message'
                        placeholder='Type your message here.'
                        height='100px'
                        width='600px'
                        value={message}
                        error={messageError}
                        fontSize='20px'/>
                </div>
                <br />
                <div className={styles.buttonContainer}>
                    <LoadingButton 
                        content='go' 
                        width='100px' 
                        handleClick={this.searchMessage}
                        wasClicked={this.state.goClicked}/>
                </div>
                <hr className={styles.inputPlaylisthr}/>
                <div className={styles.playlistContainer}>
                    {spotifyQueried ? 
                    <MockPlaylist 
                        songs={trackObjs}
                        message={message}
                        userAccessToken={userAccessToken}
                        handleTrackRefresh={this.handleTrackRefresh}
                        handleReset={this.handleReset}/> 
                    :   <div className={styles.instructions}>This is an app that creates playlists of songs that spell out whatever mesage you want. 
                            Type a message that you would like to become playlist-ified.
                            Use it to check out new music, or save it as a brand new playlist for Spotify and share with friends, 
                            family, coworkers, bosses, enemies, whomever I guess.
                            <br />
                            <br />
                            Example: <a 
                                href='https://open.spotify.com/playlist/7axUs8I2wNvkNmvB3cqLtZ' 
                                target='_blank'>1984 playlist
                            </a> - the first passage of George Orwell's <a href='https://en.wikipedia.org/wiki/Nineteen_Eighty-Four' target='_blank'>
                                1984
                            </a> in playlist form.
                        </div>}
                </div>
            </div>
        )
    }
}

export default Body
