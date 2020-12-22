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
            songsReturned: [],
            goClicked: false,
            userAccessToken: null,
            messageError: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.searchMessage = this.searchMessage.bind(this)
    }

    componentDidMount() {
        if (window.location.hash) {
            const userAccessToken = window.location.hash.match(/access_token=(.+)&token_type/)[1]
            const songsReturned = []
            let i = 0
            while (true) {
                const song = JSON.parse(localStorage.getItem(`song#${i}`))
                if (song) {
                    songsReturned.push(song)
                } else {
                    break
                }
                i += 1
            }

            this.setState({userAccessToken, songsReturned, spotifyQueried: true})
        }
    }

    handleChange(name, value) {
        this.setState({[name]: value, messageError: false})
    }

    async searchMessage() {
        // Check for empty message
        if (this.state.message == '') {
            this.setState({messageError: true})
            return
        }

        localStorage.clear()
        this.setState({songsReturned: [], spotifyQueried: true, goClicked: true})

        const message = parseSequence(this.state.message)
        const entryPromises = message.map(item => getWordEntry(item))
        const wordEntryIDs = await Promise.all(entryPromises)
        const trackPromises = wordEntryIDs.map(item => getSingleTrack(item))
        const tracks = await Promise.all(trackPromises)
        this.setState({songsReturned: tracks, goClicked: false})
    }

    render() {
        const {spotifyQueried, songsReturned, message, userAccessToken, messageError} = this.state
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
                    songs={songsReturned} 
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