import React from 'react'
import styles from './styles.css'

class SvgLink extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {href, SVG, alt, newTab, width} = this.props
        const target = newTab ? '_blank' : ''
        const style = {width}
        return(
            <div className={styles.container} style={style}>
                <a href={href} target={target}>
                   <div className={styles.svgContainer} style={style}>
                        <SVG 
                            alt={alt} 
                            className={styles.svg}
                            width={width}/>
                   </div>
                </a>
            </div>
        )
    }
}

SvgLink.defaultProps = {
    href: 'https://www.google.com',
    SVG: null,
    alt: 'google',
    newTab: false,
    width: '30px'
}

export default SvgLink

