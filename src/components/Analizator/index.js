import {connect} from "react-redux";
import PropTypes from 'prop-types'
import * as React from "react";
import {Divider, Header, Icon, Button, Image, TextArea, Loader, Label} from "semantic-ui-react";
import Token from "../Token";
import {setIsProcessing, setSortBy, setText, setTokens} from "../../actions";
import styles from './styles.css'
import analyzeText from "../../helpers/analyzer";


const Analizator = ({
                        text,
                        sortBy,
                        tokens,
                        isProcessing,
                        setText,
                        setTokens,
                        setSortBy
                    }) => {

    const getContent = () => {
        if (isProcessing) {
            return (<div className={'spinner-container'}><Loader active inline>Аналізую...</Loader></div>)
        } else if (tokens.length !== 0) {
            if (sortBy) {
                return tokens.filter(token => token.type === sortBy).map(token => (
                        <Token token={token}/>
                    )
                )
            }
            return tokens.map(token => (
                    <Token token={token}/>
                )
            )
        }
        return <p className={'no-items'}>Лексеми відсутні</p>
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
                          onInput={e => {
                              const enteredText = e.target.value
                              if (enteredText.length <= 4000) {
                                  setTokens(analyzeText((enteredText)));
                              }
                              setText(enteredText)
                          }}
                />
                <div className={'buttons-container'}>
                    {text.length > 4000 &&
                    <p className={'analyze-alert'}>Довжина тексту більше 4000 символів, щоб проаналізувати натисніть
                        кнопку "Проаналізувати"</p>}
                    <Button disabled={isProcessing} className={'content-button'} content={'Очистити'}
                            onClick={() => setText('')}/>
                    <Button disabled={isProcessing} content={'Проаналізувати'} color='green'
                            onClick={() => setTokens(analyzeText(text))}/>
                </div>
            </div>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='tag'/>
                    Лексеми
                </Header>
            </Divider>
            <div className={'tag-container'}>
                <div className={'sort-tag'} style={sortBy ? {} : {borderBottomStyle: 'solid'}}>
                    <Label as='a' tag onClick={() => setSortBy(undefined)}>
                        Всі
                    </Label>
                </div>
                <div className={'sort-tag'} style={sortBy === 'valid' ? {borderBottomStyle: 'solid'} : {}}>
                    <Label as='a' color='green' tag onClick={() => setSortBy('valid')}>
                        Валідні
                    </Label>
                </div>
                <div className={'sort-tag'} style={sortBy === 'date' ? {borderBottomStyle: 'solid'} : {}}>
                    <Label as='a' color='blue' tag onClick={() => setSortBy('date')}>
                        Дата
                    </Label></div>
                <div className={'sort-tag'} style={sortBy === 'email' ? {borderBottomStyle: 'solid'} : {}}>
                    <Label as='a' color='pink' tag onClick={() => setSortBy('email')}>
                        E-mail
                    </Label></div>
                <div className={'sort-tag'} style={sortBy === 'numeric' ? {borderBottomStyle: 'solid'} : {}}>
                    <Label as='a' color='orange' tag onClick={() => setSortBy('numeric')}>
                        Число
                    </Label></div>
                <div className={'sort-tag'} style={sortBy === 'separator' ? {borderBottomStyle: 'solid'} : {}}>
                    <Label as='a' color='violet' tag onClick={() => setSortBy('separator')}>
                        Роздільник
                    </Label>
                </div>
                <div className={'sort-tag'} style={sortBy === 'invalid' ? {borderBottomStyle: 'solid'} : {}}>
                    <Label as='a' color='red' tag onClick={() => setSortBy('invalid')}>
                        Не валідні
                    </Label>
                </div>
            </div>
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
    setIsProcessing: isProcessing => dispatch(setIsProcessing(isProcessing)),
    setTokens: tokens => dispatch(setTokens(tokens)),
    setSortBy: sortBy => dispatch(setSortBy(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(Analizator)
