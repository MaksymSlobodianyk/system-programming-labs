import {connect} from "react-redux";
import PropTypes from 'prop-types'
import * as React from "react";
import {Tab, Divider, Header, Icon, Button, Image, TextArea, Modal, Label} from "semantic-ui-react";
import {toggleShowInfo, setSortBy, setText, setTokens} from "../../actions";

const Transformation = ({
                       text,
                       sortBy,
                       tokens,
                       toggleShowInfo,
                       showInfo,
                       setText,
                       setTokens,
                       setSortBy
                   }) => {

    return (
        <div className={'container'}>
            <div>
                <h2>Результат: {'AB+c*^4:='}</h2>
            </div>
        </div>
    )
}

Transformation.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Transformation)
