import React from 'react'
import ShareMenu from './ShareMenu'

class SuccessMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {playlist, handleReset} = this.props
        return(
            <div>
                <ShareMenu playlist={playlist} />
                <button onClick={handleReset}>reset</button>
                <button>donate/amazon link/ihatemyself?</button>
            </div>
        )
    }
}

SuccessMenu.defaultProps = {
    handleReset: () => {}
}

export default SuccessMenu