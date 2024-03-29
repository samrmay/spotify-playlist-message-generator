import React from 'react'
import MockPlaylist from './MockPlaylist'
import LinkTweetModal from './LinkTweetModal'
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
            messageError: false,
            showTwitterModal: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.searchMessage = this.searchMessage.bind(this)
        this.handleTrackRefresh = this.handleTrackRefresh.bind(this)
        this.toggleTwitterModal = this.toggleTwitterModal.bind(this)

        this.desktopInputDimensions = {height: '100px', width: '600px'}
        this.mobileInputDimensions = {height: '200px', width: window.innerWidth}
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
        
        for (let i in message) {
            const word = message[i]
            const track = await this.searchWord(word)
            this.setState((prevState) => {
                const newTrackObjs = prevState.trackObjs
                newTrackObjs.push({track, word})
                return {trackObjs: newTrackObjs}
            })
        }
        this.setState({goClicked: false})
    }

    toggleTwitterModal() {
        this.setState(prevState => {return {showTwitterModal: !prevState.showTwitterModal}})
    }

    render() {
        const {spotifyQueried, trackObjs, message, userAccessToken, messageError, showTwitterModal} = this.state
        const {isMobile} = this.props
        const inputDimensions = isMobile ? this.mobileInputDimensions : this.desktopInputDimensions
        return(
            <div className={styles.bodyContainer}>
                {showTwitterModal 
                    ? <LinkTweetModal 
                        handleSkip={this.toggleTwitterModal} 
                        handleChange={this.handleChange}
                        searchMessage={this.searchMessage}/> : null}

                <div className={styles.inputContainer}>
                    <TextField 
                        handleChange={this.handleChange} 
                        name='message'
                        placeholder='Type a message to be playlist-ified.'
                        height={inputDimensions.height}
                        width={inputDimensions.width}
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
                    <LoadingButton 
                        content='playlist-ify tweet'
                        width='200px'
                        handleClick={this.toggleTwitterModal}/>
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
                    :   <div className={styles.instructions}>This is an app that creates playlists of songs that spell out whatever message (or tweet) you want. 
                            Use it to check out new music, or save it as a brand new playlist for Spotify and share with friends, 
                            family, coworkers, bosses, enemies, whomever I guess. Type a message or link a tweet to get started. (May require creative use of homophones)
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
