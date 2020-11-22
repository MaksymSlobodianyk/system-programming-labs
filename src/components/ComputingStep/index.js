import PropTypes from 'prop-types'
import * as React from "react";
import {Header, Label, Modal, Image} from "semantic-ui-react";


const ComputingStep = ({toggleShowInfo, showInfo }) =>{
    return (
        <div>

        </div>
    )
}

ComputingStep.propTypes = {
    showInfo: PropTypes.bool.isRequired,
    toggleShowInfo: PropTypes.func.isRequired,

}


export default ComputingStep;
