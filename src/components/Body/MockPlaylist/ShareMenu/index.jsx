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
        const {playlist, title} = this.props
        const twitterText = `${playlist.name} - made with <3 at https://www.playlistmessage.app`
        const facebookText = `Made with <3 at https://www.playlistmessage.app`

        const facebookLink = `http://www.facebook.com/dialog/share?app_id=174829003346&display=page&href=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F${playlist.id}%3Fsi%3DATReQ5GBTraNUTtJdA2rWg&quote=${encodeURI(facebookText)}`
        const twitterLink = `https://twitter.com/intent/tweet?related=spotify&text=${encodeURI(twitterText)}&url=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F${playlist.id}%3Fsi%3D89hYCHwFRwykgxFB2W4Guw`
        const messengerLink = `http://www.facebook.com/dialog/send?app_id=174829003346&link=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F${playlist.id}%3Fsi%3D_CoRUqkiSwmr5IvkqI2JdQ`
        const viewLink = playlist.external_urls.spotify

        return(
            <div>
                <h4 className={styles.titleContainer}>{title}</h4>
                <hr />
                <div className={styles.buttonMenu}>
                    <div className={styles.linkContainer}><SvgLink SVG={spotifyIcon} href={viewLink} alt='view playlist'/></div>
                    <div className={styles.linkContainer}><SvgLink SVG={facebookIcon} href={facebookLink} alt='facebook'/></div>
                    <div className={styles.linkContainer}><SvgLink SVG={twitterIcon} href={twitterLink} alt='twitter'/></div>
                    <div className={styles.linkContainer}><SvgLink SVG={messengerIcon} href={messengerLink} alt='messenger'/></div>
                </div>
            </div>
        )
    }
}

export default ShareMenu

ShareMenu.defaultProps = {
    playlist: {
        id: '000'
    },
    title: 'share playlist'
}