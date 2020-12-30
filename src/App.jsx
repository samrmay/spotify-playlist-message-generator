import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import styles from './styles.css'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            isMobile: false
        }
    }

    componentDidMount() {
        this.setState({isMobile: !window.matchMedia('(min-width: 800px)').matches})
    }

    render() {
        const {isMobile} = this.state
        return(
            <div className={styles.root}>
                <div>
                    <Header />
                    <div className={styles.bodyContainer}><Body isMobile={isMobile}/></div>
                </div>
                <div><Footer /></div>
            </div>
        )
    }
}

export default App