import React from 'react'
import SongEntry from './SongEntry'

class MockPlaylist extends React.Component {
    constructor(props) {
        super(props)
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
            <div>
                {songEntryArr ? songEntryArr : <div>loading...</div>}
            </div>
        )
    }
}

export default MockPlaylist