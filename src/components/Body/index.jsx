import React from 'react'
import MockPlaylist from './MockPlaylist'
import {getAccessToken, generateSongSequence} from '../../services/spotify'

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

    handleChange(e) {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    getAccess() {
        return getAccessToken().then(response => {this.setState({accessToken: response.access_token})})
    }

    searchSong() {
        this.setState({songsReturned: [], spotifyQueried: true})
        this.getAccess().then(response => {
            generateSongSequence(this.state.message, this.state.accessToken).then(response => {
                this.setState({songsReturned: response})
            })
        })
    }

    render() {
        const {spotifyQueried, songsReturned} = this.state
        return(
            <div>
                <textarea name='message' value={this.state.message} onChange={this.handleChange}/>
                <br />
                <br />
                <button onClick={this.searchSong}>go</button>
                {spotifyQueried ? <MockPlaylist songs={songsReturned}/> : null}
            </div>
        )
    }
}

export default Body