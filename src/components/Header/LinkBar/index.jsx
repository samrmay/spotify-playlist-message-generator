import React from 'react'
import SvgLink from '../../SvgLink'
import twitterIcon from '../../../assets/twitterIcon.svg'
import styles from './styles.css'

class ShareBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <SvgLink href='https://twitter.com/samrmay1' SVG={twitterIcon}/>
            </div>
        )
    }
}

export default ShareBar