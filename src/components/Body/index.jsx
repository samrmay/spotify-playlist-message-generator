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
            tracksObjs: [],
            goClicked: false,
            userAccessToken: null,
            messageError: false
        }
        this.handleChange = this.handleChange.bind(this)
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

            this.setState({userAccessToken, trackObjs, spotifyQueried: true})
        }
    }

    handleChange(name, value) {
        this.setState({[name]: value, messageError: false})
    }

    async searchWord(word) {
        const entry = await getWordEntry(word)
        return getSingleTrack(entry || '')
    }

    async handleTrackRefresh(index) {
        const {trackObjs} = this.state
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
            <div>
                <div className={styles.inputContainer}>
                    <TextField 
                        handleChange={this.handleChange} 
                        name='message'
                        placeholder='Type your message here.'
                        height='100px'
                        width='400px'
                        value={message}
                        error={messageError}/>
                </div>
                <br />
                <div className={styles.buttonContainer}>
                    <LoadingButton 
                        content='go' 
                        width='100px' 
                        handleClick={this.searchMessage}
                        wasClicked={this.state.goClicked}/>
                </div>
                <hr />
                {spotifyQueried ? 
                <MockPlaylist 
                    songs={trackObjs} 
                    standby={true}
                    userAccessToken={userAccessToken}/> : null}
            </div>
        )
    }
}

export default Body


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(ms) {
    await timeout(ms);
    return null;
}