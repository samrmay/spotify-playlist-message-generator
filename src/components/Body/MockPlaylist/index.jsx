import React from 'react'
import SongEntry from './SongEntry'
import TextField from '../TextField'
import styles from './styles.css'

class MockPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlistTitle: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(name, value) {
        this.setState({[name]: value})
    }

    render() {
        const {songs} = this.props
        let songEntryArr = null
        if (songs.length > 0) {
            songEntryArr = []
            for (let i in songs) {
                if (songs[i] !== null) {
                    songEntryArr.push(<SongEntry song={songs[i]} key={i}/>)
                }
            }
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
                {songEntryArr ? songEntryArr : <div>loading...</div>}
            </div>
        )
    }
}

export default MockPlaylist