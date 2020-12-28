import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import styles from './styles.css'

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return(
            <div className={styles.root}>
                <div>
                    <Header />
                    <div className={styles.bodyContainer}><Body /></div>
                </div>
                <div><Footer /></div>
            </div>
        )
    }
}

export default App