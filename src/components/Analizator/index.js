import {connect} from "react-redux";
import PropTypes from 'prop-types'
import * as React from "react";
import {Divider, Header, Icon, Button, Image, TextArea, Loader} from "semantic-ui-react";
import Token from "../Token";
import {setIsProcessing, setText} from "../../actions";
import styles from './styles.css'
import analyzeText from "../../helpers/analyzer";


const Analizator = ({
                        text,
                        sortBy,
                        tokens,
                        isProcessing,
                        setText,
                        setIsProcessing
                    }) => {

    const getContent = () => {
        if (isProcessing) {
            return (<div className={'spinner-container'}><Loader active inline>Аналізую...</Loader></div>)
        } else if (tokens.length !== 0) {
            return tokens.map(token => (
                    <Token token={token.token} type={token.type}/>
                )
            )
        }
        return <p className={'no-items'}>Лексеми відсутні</p>
    }

    const analyze = () =>{
        setIsProcessing(true)
        console.log(text)
        analyzeText(text)
        setIsProcessing(false)
    }

    return (
        <div>
            <div className={'container'}>
                <div className={'header'}>
                    <div className={'header-container'}>
                        <Image className={'header-image'}
                               src='https://www.flaticon.com/svg/static/icons/svg/1265/1265907.svg'/>
                        <h2 className={'header-text'}>Ukrainian language analizator</h2>
                    </div>
                    <div className={'header-container'}>
                        <Image className={'header-image'} circular src='https://i.imgur.com/rFncihd.jpg'/>
                        <h2 className={'header-text'}>by Maksym Slobodianyk</h2>
                    </div>
                </div>
                <TextArea className={'text-area'}
                          placeholder='Вставте укранський текст для аналізу...'
                          style={{minHeight: 400}}
                          value={text}
                          disabled={isProcessing}
                          onInput={e => setText(e.target.value)}
                />
                <div className={'buttons-container'}>
                    <Button disabled={isProcessing} className={'content-button'} content={'Очистити'} onClick={() => setText('')}/>
                    <Button disabled={isProcessing} content={'Проаналізувати'} color='green' onClick={() => analyze()}/>
                </div>
            </div>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='tag'/>
                    Лексеми
                </Header>
            </Divider>
            <div className={'container'}>
                {getContent()}
            </div>
        </div>
    )
}

Analizator.propTypes = {
    isProcessing: PropTypes.bool.isRequired,
    tokens: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    sortBy: PropTypes.string
}

const mapStateToProps = state => ({
    state: state,
    isProcessing: state.analyzerReducer.isProcessing,
    tokens: state.analyzerReducer.tokens,
    text: state.analyzerReducer.text,
    sortBy: state.analyzerReducer.sortBy,
})

const mapDispatchToProps = dispatch => ({
    setText: text => dispatch(setText(text)),
    setIsProcessing: isProcessing => dispatch(setIsProcessing(isProcessing))
})

export default connect(mapStateToProps, mapDispatchToProps)(Analizator)
