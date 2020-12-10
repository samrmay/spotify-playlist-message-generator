import React from 'react'
import {getAccessToken, getSongs} from '../../services/spotify'

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            songName: '',
            accessToken: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.searchSong = this.searchSong.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    searchSong() {
        if (this.state.accessToken == '') {
            getAccessToken()
            .then(response => {
                this.setState({accessToken: response.access_token})
            })
            .then(response => {
                getSongs(this.state.songName, this.state.accessToken)
                .then(response => {console.log(response)})
            })
        }
        else {
            getSongs(this.state.songName, this.state.accessToken).then(response => console.log(response))
        }
    }

    render() {
        return(
            <div>
                <input name='songName' value={this.state.songName} onChange={this.handleChange}/>
                <button onClick={this.searchSong}>go</button>
            </div>
        )
    }
}

export default Body