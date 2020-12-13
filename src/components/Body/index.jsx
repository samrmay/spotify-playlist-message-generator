import React from 'react'
import MockPlaylist from './MockPlaylist'
import TextField from './TextField'
import LoadingButton from './LoadingButton'
import {getAccessToken, parseSequence, findExactMatch} from '../../services/spotify'
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
            userAccessToken: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.getAccess = this.getAccess.bind(this)
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
        this.setState({[name]: value})
    }

    getAccess() {
        return getAccessToken().then(response => {
            this.setState({accessToken: response.access_token})
            return response.access_token
        })
    }

    async searchBatch(batch, token) {
        const promises = []
        for (let i in batch) {
            promises.push(findExactMatch(batch[i], token))
        }
        const results = await Promise.all(promises)
        for (let i in results) {
            if (results[i].error) {
                return {error: true}
            }
        }
        this.setState(prevState => {
            const newArr = prevState.songsReturned
            for (let i in results) {
                newArr.push(results[i].item)
            }
            return {songsReturned: newArr}
        })
        return {error: false}
    }

    async searchMessage() {
        this.setState({songsReturned: [], spotifyQueried: true, goClicked: true})
        this.getAccess().then(async (token) => {
            const message = parseSequence(this.state.message)
            const batSize = 5

            const maxi = Math.ceil(message.length/batSize)*batSize
            for (let i = 1;i<maxi;i += batSize) {
                const upper = batSize > message.length ? message.length : batSize
                const batch = message.splice(0, upper)
                const error = await this.searchBatch(batch, token)
                await sleep(2500)
                if (error.error) {
                    console.log('error')
                    await sleep(5000)
                    console.log('timeout finished')
                    await this.searchBatch(batch, token)
                }
            }
            this.setState({goClicked: false})
        })
    }

    render() {
        const {spotifyQueried, songsReturned, message, userAccessToken} = this.state
        return(
            <div>
                <TextField 
                    handleChange={this.handleChange} 
                    name='message'
                    placeholder='Type your message here.'
                    height='100px'
                    width='300px'
                    value={message}
                    />
                <br />
                <LoadingButton 
                    content='go' 
                    width='100px' 
                    handleClick={this.searchMessage}
                    wasClicked={this.state.goClicked}/>
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