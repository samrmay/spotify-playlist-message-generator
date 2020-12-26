import React from 'react'
import SvgLink from '../../../SvgLink'
import spotifyIcon from '../../../../assets/spotifyIcon.svg'
import facebookIcon from '../../../../assets/facebookIcon.svg'
import twitterIcon from '../../../../assets/twitterIcon.svg'
import messengerIcon from '../../../../assets/messengerIcon.svg'
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
        const viewLink = playlist.external_urls.spotify

        return(
            <div className={styles.buttonMenu}>
                <div className={styles.linkContainer}><SvgLink SVG={spotifyIcon} href={viewLink} alt='view playlist'/></div>
                <div className={styles.linkContainer}><SvgLink SVG={facebookIcon} href={facebookLink} alt='facebook' newTab={true}/></div>
                <div className={styles.linkContainer}><SvgLink SVG={twitterIcon} href={twitterLink} alt='twitter' newTab={true} /></div>
                <div className={styles.linkContainer}><SvgLink SVG={messengerIcon} href={messengerLink} alt='messenger' newTab={true} /></div>
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