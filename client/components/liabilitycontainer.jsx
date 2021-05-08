import React from 'react';
import ReactDom from 'react-dom';
import Liability from './liability.jsx'

class Liabilitycontainer extends React.Component {
    render() {

    
        return (
            <div>
            <div>this is the Liabilitycontainer</div>
                <Liability/>
            </div>
        )
    }
}

// const Liabilitycontainer = () => {

// }

export default Liabilitycontainer;


// const afterDelete = (id) => {
//     setLiabilities(libilities.filter(el => el_.id !== id))
// }