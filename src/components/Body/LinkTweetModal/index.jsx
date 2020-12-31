import React from 'react'
import TextField from '../TextField'
import LoadingButton from '../LoadingButton'
import {searchTweet, cleanTweetText} from '../../../services/twitter'
import styles from './styles.css'

class LinkTweetModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweetUrl: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.searchTweet = this.searchTweet.bind(this)
    }

    handleChange(name, value) {
        this.setState({[name]: value})
    }

    async searchTweet() {
        const {handleChange, searchMessage, handleSkip} = this.props
        const {data} = await searchTweet(this.state.tweetUrl)
        let text = data.text

        if (text) {
            text = cleanTweetText(text)
            handleChange('message', text)
            searchMessage()
            handleSkip()
        }
    }

    render() {
        const {tweetUrl} = this.state

        return (
          <div className={styles.modalContainer}>
            <div className={styles.modalWindow}>
                <div className={styles.inputContainer}>
                    <TextField 
                        name='tweetUrl'
                        value={tweetUrl}
                        handleChange={this.handleChange}
                        height='200px'
                        placeholder='paste tweet url here'
                        fontSize='20px'/>
                </div>
                <div className={styles.buttonContainer}>
                    <LoadingButton 
                        handleClick={this.props.handleSkip}
                        width='100px'
                        content='cancel'/>
                    <LoadingButton 
                        handleClick={this.searchTweet}
                        width='100px'
                        content='go'/>
                </div>
            </div>
          </div>
        );
      }
}

export default LinkTweetModal

