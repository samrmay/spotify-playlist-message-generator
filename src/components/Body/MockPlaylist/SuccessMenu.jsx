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
                    Success! if you liked the app, do something so I don't starve (?)
                </div>
            </div>
        )
    }
}

SuccessMenu.defaultProps = {
    handleReset: () => {}
}

export default SuccessMenu