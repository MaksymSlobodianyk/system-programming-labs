import {connect} from "react-redux";
import PropTypes from 'prop-types'
import * as React from "react";
import {Divider, Header, Icon, Button, Image, TextArea, Modal, Label} from "semantic-ui-react";
import Token from "../Token";
import {toggleShowInfo, setSortBy, setText, setTokens} from "../../actions";
import styles from './styles.css'
import analyzeText from "../../helpers/analyzer";


const Analizator = ({
                        text,
                        sortBy,
                        tokens,
                        toggleShowInfo,
                        showInfo,
                        setText,
                        setTokens,
                        setSortBy
                    }) => {

    const mockData = `Слободяник Максим, 

Маю 29 років!
Народився: 27/09/2020.


Особиста пошта:       madianyk@gmailcom;
Корпоративна пошта:       ma.dianyk@ukma.edu.ua;


Особистий номер: 077-345-15-65.
`

    const getContent = () => {
        if (tokens.length !== 0) {
            if (sortBy) {
                return tokens.filter(token => token.type === sortBy).map(token => (
                        <Token token={token}  setSortBy={setSortBy}/>
                    )
                )
            }
            return tokens.map(token => (
                    <Token token={token} setSortBy={setSortBy}/>
                )
            )
        }
        return <p className={'no-items'}>Лексеми відсутні</p>
    }

    return (
        <div>
            {showInfo &&
            <Modal
                basic
                closeIcon
                onClose={() => toggleShowInfo()}
                onOpen={() => toggleShowInfo()}
                open={showInfo}
                size='small'
            >
                <Header icon>
                    <h1>Привіт, я аналізатор української мови!</h1>
                </Header>
                <Modal.Content>
                    <h3>Я поділяю текст на такі класи лексем: </h3>
                    <div className={'info-row'}>
                        <Label as='a' color='green' tag onClick={() => setSortBy('valid')}>
                            Валідні
                        </Label>
                        <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що cкладаються з символів ['c',
                            'л', 'о', 'б',
                            'д', 'я', 'н', 'и', 'к'] </p>
                    </div>
                    <div className={'info-row'}>
                        <Label as='a' color='blue' tag onClick={() => setSortBy('date')}>
                            Дата
                        </Label>
                        <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є датою у форматі
                            dd/mm/yyyy</p>
                    </div>
                    <div className={'info-row'}>
                        <Label as='a' color='yellow' tag onClick={() => setSortBy('email')}>
                            E-mail
                        </Label>
                        <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є валідними адресами
                            електронних скриньок</p>
                    </div>
                    <div className={'info-row'}>
                        <Label as='a' color='pink' tag onClick={() => setSortBy('numeric')}>
                            Номер телефону
                        </Label>
                        <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є номерами телефонів у форматі
                            999-999-99-99</p>
                    </div>
                    <div className={'info-row'}>
                        <Label as='a' color='orange' tag onClick={() => setSortBy('numeric')}>
                            Число
                        </Label>
                        <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є числами типу +123, -123,
                            123, +12.4, -12.4, 12.4</p>
                    </div>
                    <div className={'info-row'}>
                        <Label as='a' color='violet' tag onClick={() => setSortBy('separator')}>
                            Роздільник
                        </Label>
                        <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є роздільниками</p>
                    </div>
                    <div className={'info-row'}>
                        <Label as='a' color='red' tag onClick={() => setSortBy('invalid')}>
                            Не валідні
                        </Label>
                        <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що не увійшли до попередніх
                            класів </p>
                    </div>
                    <div className={'info-row'}/>
                    <div className={'info-row'}>
                        <h3>Щоб знову побачити це вікно, клікни на </h3>
                        <Image className={'header-image'} style={{width:'25px', marginLeft: '10px'}}
                               src='https://www.flaticon.com/svg/static/icons/svg/1265/1265907.svg'/>
                    </div>
                </Modal.Content>
            </Modal>}
            <div className={'container'}>
                <div className={'header'}>
                    <div className={'header-container'}>
                        <Image className={'header-image'}
                               src='https://www.flaticon.com/svg/static/icons/svg/1265/1265907.svg' onClick={() => toggleShowInfo()}/>
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
                          onInput={e => {
                              const enteredText = e.target.value
                              if (enteredText.length <= 4000) {
                                  setTokens(analyzeText(enteredText));
                              }
                              setText(enteredText)
                          }}
                />
                {text.length > 4000 &&
                <p className={'analyze-alert'}>Довжина тексту більше 4000 символів, щоб проаналізувати натисніть
                    кнопку "Проаналізувати"</p>}
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
                    }}>Натисніть, щоб вставити тестовий текст</div>
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
                    <Label as='a' color='yellow' tag onClick={() => setSortBy('email')}>
                        E-mail
                    </Label></div>
                <div className={'sort-tag'} style={sortBy === 'tel' ? {borderBottomStyle: 'solid'} : {}}>
                    <Label as='a' color='pink' tag onClick={() => setSortBy('tel')}>
                        Номер телефону
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
    showInfo: PropTypes.bool.isRequired,
    tokens: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    sortBy: PropTypes.string
}

const mapStateToProps = state => ({
    state: state,
    showInfo: state.analyzerReducer.showInfo,
    tokens: state.analyzerReducer.tokens,
    text: state.analyzerReducer.text,
    sortBy: state.analyzerReducer.sortBy,
})

const mapDispatchToProps = dispatch => ({
    setText: text => dispatch(setText(text)),
    toggleShowInfo: () => dispatch(toggleShowInfo()),
    setTokens: tokens => dispatch(setTokens(tokens)),
    setSortBy: sortBy => dispatch(setSortBy(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(Analizator)
