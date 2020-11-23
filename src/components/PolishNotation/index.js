import PropTypes from 'prop-types'
import * as React from "react";
import {Input, Divider, Header, Icon, Button, Tab} from "semantic-ui-react";
import Transformation from "../Transformation";
import Computing from "../Computing";
import {compute, transform} from "../../helpers/polish";

const PolishNotation = ({
                            expression,
                            setExpression,
                            setExpressionIsCorrect,
                            expressionIsCorrect,
                            setComputedResult,
                            setPolishNotationResult,
                            polishNotationResult,
                            computingResult,
                            polishNotationSteps,
                            computingSteps,
                            setComputingSteps,
                            setPolishNotationSteps
                        }) => {

    const mockData = `A:=((15-2)*3)*(sin(3+5,6)+(4-4))+A[i,j+3]`

    const checkIfCorrect = text => {
        setExpressionIsCorrect(!text || text.match(/^[\d\w:=,\(\)\[\]\*\+\-\\\^]+$/gi));
    }
    const process = () => {
        const {transResult, transSteps} = transform(expression);
        setPolishNotationResult(transResult)
        setPolishNotationSteps(transSteps)
        if (expression.match(/^((sin)|[\d\(\)\[\]\*\+\-\\\^])+$/gi)) {
            const {compResult, compSteps} = compute();
            setComputedResult(compResult)
            setComputingSteps(compSteps)
        } else {
            setComputedResult('')
            setComputingSteps([])
        }
    }

    const panes = [
        {
            menuItem: {key: 'analyzer', icon: 'sort numeric down', content: 'Перевід в польську нотацію'},
            render: () => <Tab.Pane attached={false}><Transformation result={polishNotationResult} steps={polishNotationSteps}/></Tab.Pane>,
        },
        {
            menuItem: {key: 'polish', icon: 'sliders horizontal', content: 'Обчислення виразу'},
            render: () => <Tab.Pane attached={false}><Computing result={computingResult}/></Tab.Pane>,
        }
    ]

    return (
        <div>
            <div className={'container'}>
                <Input
                    className={'polish-input'}
                    size={'big'}
                    value={expression}
                    error={!expressionIsCorrect}
                    placeholder='Введіть вираз для аналізу та підрахунку...'
                    onInput={e => {
                        const enteredText = e.target.value
                        checkIfCorrect(enteredText);
                        setExpression(enteredText)
                    }}
                />
                <div className={'buttons-container'}>
                    {expression.length === 0 &&
                    <div style={{
                        color: '#AEB5BF',
                        alignSelf: 'center',
                        cursor: 'pointer',
                        marginRight: '30px'
                    }} onClick={() => {
                        setExpression(mockData);
                    }}>Натисніть, щоб вставити тестовий вираз</div>
                    }
                    <Button className={'content-button'}
                            content={'Очистити'}
                            disabled={!expression || !expressionIsCorrect}
                            onClick={() => {
                                setExpression('');
                            }}/>
                    <Button content={'Проаналізувати'}
                            color='green'
                            disabled={!expression || !expressionIsCorrect}
                            onClick={() => process()}/>

                </div>
            </div>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='tag'/>
                    Результати
                </Header>
            </Divider>
            <Tab className={'tabs'} menu={{secondary: true, pointing: true, size: 'big'}} panes={panes}/>
        </div>
    )
}

PolishNotation.propTypes = {
    showInfo: PropTypes.bool.isRequired,
    tokens: PropTypes.array.isRequired,
    expression: PropTypes.string.isRequired,
    sortBy: PropTypes.string
}


export default PolishNotation;
