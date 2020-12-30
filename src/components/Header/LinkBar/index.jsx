import React from 'react'
import SvgLink from '../../SvgLink'
import twitterIcon from '../../../assets/twitterIcon.svg'
import githubIcon from '../../../assets/githubSmallDark.svg'
import styles from './styles.css'

class ShareBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.bar}>
                <div className={styles.item}>
                    <SvgLink href='https://twitter.com/samrmay1' SVG={twitterIcon}/>
                </div>
                <div className={styles.item}>
                    <SvgLink href='https://github.com/samrmay' SVG={githubIcon}/>
                </div>
            </div>
        )
    }
}

export default ShareBar