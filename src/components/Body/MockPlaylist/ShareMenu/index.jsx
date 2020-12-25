import React from 'react'
import styles from './styles.css'

class ShareMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {playlist} = this.props
        const facebookLink = `http://www.facebook.com/dialog/share?app_id=174829003346&display=page&href=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F${playlist.id}%3Fsi%3DATReQ5GBTraNUTtJdA2rWg&redirect_uri=https%3A%2F%2Fwww.spotify.com%2Fthanks-for-sharing%2F&hashtag=%23NowPlaying`
        const twitterLink = `https://twitter.com/intent/tweet?hashtags=NowPlaying&related=spotify&text=2am%20share%20test%20deux&url=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F${playlist.id}%3Fsi%3D89hYCHwFRwykgxFB2W4Guw`
        const messengerLink = `http://www.facebook.com/dialog/send?app_id=174829003346&link=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F${playlist.id}%3Fsi%3D_CoRUqkiSwmr5IvkqI2JdQ&redirect_uri=https%3A%2F%2Fwww.spotify.com%2Fthanks-for-sharing%2F`

        return(
            <div className={styles.buttonMenu}>
                <a href={facebookLink} className={styles.shareLink}>facebook</a>
                <a href={twitterLink} className={styles.shareLink}>twitter</a>
                <a href={messengerLink} className={styles.shareLink}>messenger</a>
            </div>
        )
    }
}

export default ShareMenu

ShareMenu.defaultProps = {
    playlist: {
        id: '000'
    }
}