import React from 'react'
import ShareMenu from './ShareMenu'
import LoadingButton from '../LoadingButton'
import styles from './styles.css'

class SuccessMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {playlist, handleReset} = this.props
        return(
            <div className={styles.successMenuContainer}>
                <div className={styles.shareMenuContainer}>
                    <LoadingButton 
                        handleClick={handleReset}
                        content='reset'
                        width='150px'/>
                    <ShareMenu playlist={playlist} />
                </div>
                <div className={styles.donateLink}>
                    Success! If you liked the app (or hated it), 
                    reach out on <a href='https://twitter.com/samrmay1'>twitter</a> or via <a href='mailto:samrmay@sas.upenn.edu'>email</a> (I 
                    also happily accept freelance work and am always looking for fun projects).
                </div>
            </div>
        )
    }
}

SuccessMenu.defaultProps = {
    handleReset: () => {}
}

export default SuccessMenu