import {connect} from "react-redux";
import PropTypes from 'prop-types'
import * as React from "react";
import {Tab, Divider, Header, Icon, Button, Image, TextArea, Modal, Label} from "semantic-ui-react";
import {toggleShowInfo, setSortBy, setText, setTokens} from "../../actions";
import Analizator from "../Analizator";
import styles from "./styles.css"


const Container = ({
                       text,
                       sortBy,
                       tokens,
                       toggleShowInfo,
                       showInfo,
                       setText,
                       setTokens,
                       setSortBy
                   }) => {

    const panes = [
        {
            menuItem: 'Аналізатор української мови',
            render: () => <Tab.Pane attached={false}><Analizator/></Tab.Pane>,
        },
        {
            menuItem: 'Польська нотація',
            render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
        }
    ]
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
                        <Image className={'header-image'} style={{width: '25px', marginLeft: '10px'}}
                               src='https://www.flaticon.com/svg/static/icons/svg/1265/1265907.svg'/>
                    </div>
                </Modal.Content>
            </Modal>}
            <div className={'tab-container'}>
                <div className={'header'}>
                    <div className={'header-container'}>
                        <Image className={'header-image'}
                               src='https://www.flaticon.com/svg/static/icons/svg/1265/1265907.svg'
                               onClick={() => toggleShowInfo()}/>
                        <h2 className={'header-text'}>Лабораторні роботи з системного програмування</h2>
                    </div>
                    <div className={'header-container'}>
                        <Image className={'header-image'} circular src='https://i.imgur.com/rFncihd.jpg'/>
                        <h2 className={'header-text'}>Слободяник Максим</h2>
                    </div>
                </div>
                <Tab menu={{pointing: true}} panes={panes}/>
            </div>
        </div>
    )
}

Container.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Container)
