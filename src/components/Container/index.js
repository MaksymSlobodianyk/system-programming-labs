import {connect} from "react-redux";
import PropTypes from 'prop-types'
import * as React from "react";
import {Tab, Divider, Header, Icon, Button, Image, TextArea, Modal, Label} from "semantic-ui-react";
import {toggleShowInfo, setSortBy, setText, setTokens} from "../../actions";
import Analyzer from "../Analyzer";
import styles from "./styles.css"
import PolishNotation from "../PolishNotation";
import AnalyzerModal from "../AnalyzerModal";


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
            menuItem: {key: 'analyzer', icon: 'language', content: 'Аналізатор української мови'},
            render: () => <Tab.Pane attached={false}><Analyzer
                text={text}
                sortBy={sortBy}
                tokens={tokens}
                setText={setText}
                setTokens={setTokens}
                setSortBy={setSortBy}
            />
            </Tab.Pane>,
        },
        {
            menuItem: {key: 'polish', icon: 'sort numeric down', content: 'Польська нотація'},
            render: () => <Tab.Pane attached={false}><PolishNotation/></Tab.Pane>,
        }
    ]
    return (
        <div>
            {showInfo && <AnalyzerModal
                showInfo={showInfo}
                toggleShowInfo={toggleShowInfo}
            />}
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
                <Tab className={'tabs'} menu={{pointing: true, size: 'big'}} panes={panes}/>
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
