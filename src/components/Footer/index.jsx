import React from 'react'
import styles from './styles.css'

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.footer}>
                A mini project by <a 
                    href='https://github.com/samrmay'
                    className={styles.link}>Sam May</a>
            </div>
        )
    }
}

export default Footer