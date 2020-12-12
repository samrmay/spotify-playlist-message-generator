import React from 'react'

class SongEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    stringifyArtists(artists) {
        if (artists.length == 0) {
            return artists[0].name
        }
        let result = artists[0].name
        for (let i=1;i<artists.length;i++) {
            result = `${result}, ${artists[i].name}`
        }
        return result
    }

    render() {
        const {song} = this.props
        const {name, artists, preview_url} = song
        const artistsString = this.stringifyArtists(artists)
        return(
        <div>{name}: {artistsString}</div>
        )
    }
}

export default SongEntry