import PropTypes from 'prop-types'
import * as React from "react";
import {Header, Label, Modal, Image} from "semantic-ui-react";


const TransformationStep = (step) => {
    return (
        <div className={'token-container'}>
            <div>
                <Label as='a' color="green" tag>
                    {step.step.item}
                </Label>
            </div>
            <div className={'token-title'}> Stack: [
                {step.step.stack.join(" , ")}
                ]
            </div>
            <div className={'token-title'}>
                {step.step.output}
            </div>
        </div>
    )
}


TransformationStep.propTypes = {
    showInfo: PropTypes.bool.isRequired,
    toggleShowInfo: PropTypes.func.isRequired,

}


export default TransformationStep;
