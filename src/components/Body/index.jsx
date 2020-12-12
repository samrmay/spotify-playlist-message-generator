import React from 'react'
import MockPlaylist from './MockPlaylist'
import TextField from './TextField'
import {getAccessToken, parseSequence, findExactMatch} from '../../services/spotify'
import styles from './styles.css'

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            accessToken: '',
            spotifyQueried: false,
            songsReturned: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.getAccess = this.getAccess.bind(this)
        this.searchSong = this.searchSong.bind(this)
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

    searchSong() {
        this.setState({songsReturned: [], spotifyQueried: true})
        this.getAccess().then(token => {
            let {message} = this.state
            message = parseSequence(message)
            const newArr = []
            for (let _ in message) {
                newArr.push(null)
            }
            for (let i in message) {
                findExactMatch(message[i], token).then(response => {
                    newArr[i] = response
                    this.setState({songsReturned: newArr})
                })
            }
        })
    }

    render() {
        const {spotifyQueried, songsReturned, message} = this.state
        return(
            <div>
                <TextField 
                    handleChange={this.handleChange} 
                    name='message'
                    placeholder='Type in your message here'
                    height='100px'
                    width='300px'
                    value={message}
                    />
                <br />
                <br />
                <button onClick={this.searchSong}>go</button>
                {spotifyQueried ? <MockPlaylist songs={songsReturned}/> : null}
            </div>
        )
    }
}

export default Body