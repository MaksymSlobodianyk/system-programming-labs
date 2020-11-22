import PropTypes from 'prop-types'
import * as React from "react";
import {Input, Divider, Header, Icon, Button, Tab} from "semantic-ui-react";
import analyzeText from "../../helpers/analyzer";
import Transformation from "../Transformation";
import Computing from "../Computing";


const PolishNotation = ({
                            text,
                            sortBy,
                            tokens,
                            toggleShowInfo,
                            showInfo,
                            setText,
                            setTokens,
                            setSortBy
                        }) => {

    const mockData = ``

    const panes = [
        {
            menuItem: {key: 'analyzer', icon: 'sort numeric down', content: 'Перевід в польську нотацію'},
            render: () => <Tab.Pane attached={false}><Transformation/></Tab.Pane>,
        },
        {
            menuItem: {key: 'polish', icon: 'sliders horizontal', content: 'Обчислення виразу'},
            render: () => <Tab.Pane attached={false}><Computing/></Tab.Pane>,
        }
    ]

    return (
        <div>
            <div className={'container'}>
                <Input
                    className={'polish-input'}
                    size={'big'}
                    placeholder='Введіть вираз для аналізу та підрахунку...'
                />
                <div className={'buttons-container'}>
                    {text.length === 0 &&
                    <div style={{
                        color: '#AEB5BF',
                        alignSelf: 'center',
                        cursor: 'pointer',
                        marginRight: '30px'
                    }} onClick={() => {
                        setText(mockData);
                        setTokens(analyzeText(mockData));
                    }}>Натисніть, щоб вставити тестовий вираз</div>
                    }
                    <Button className={'content-button'} content={'Очистити'}
                            onClick={() => {
                                setText('');
                                setTokens([]);
                            }}/>
                    <Button content={'Проаналізувати'} color='green'
                            onClick={() => setTokens(analyzeText(text))}/>

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
    text: PropTypes.string.isRequired,
    sortBy: PropTypes.string
}


export default PolishNotation;
