import PropTypes from 'prop-types'
import * as React from "react";
import {Tab, Divider, Header, Icon, Button, Image, TextArea, Modal, Label} from "semantic-ui-react";
import TransformationStep from "../TransformationStep";

const Transformation = ({result = [], steps = []}) => {

    return (
        <div className={'container'}>
            {(steps.length !== 0) &&
            <div>
                <div>
                    <h2>Результат: {result}</h2>
                </div>
                {steps.map(step => (
                    <div>
                       <TransformationStep step={step}/>
                    </div>
                ))}
            </div>}

            {(steps.length === 0) && (
                <div>
                    <p className={'no-items'}>Для отримання польської нотації введіть вираз для переводу</p>
                </div>
            )}
        </div>
    )
}

Transformation.propTypes = {
    showInfo: PropTypes.bool.isRequired,
    tokens: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    sortBy: PropTypes.string
}

export default Transformation
