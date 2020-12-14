import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return(
            <div>
                <div><Header /></div>
                <hr />
                <div><Body /></div>
                <hr />
                <div><Footer /></div>
            </div>
        )
    }
}

export default App