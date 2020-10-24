import React from 'react'
import PropTypes from 'prop-types'
import {Label} from "semantic-ui-react";
import styles from './styles.css'

const Token = ({token, type,}) => {

    const getColor = () => {
        switch (type){
            case 'name':
                return 'green'
            case 'numeric':
                return 'orange'
            case 'date':
                return 'blue'
            case 'email':
                return 'yellow'
            case 'tel':
                return 'pink'
            default: return 'red'
        }
    }

    const getDescription = () => {
        switch (type){
            case 'name':
                return `Складається з символів ['c', 'л', 'о', 'б', 'д', 'я', 'н', 'и', 'к']`
            case 'numeric':
                return 'Складється з цифр та крапки - розділювача'
            case 'date':
                return 'Дата в форматі dd/mm/yyyy або mm/dd/yyyy'
            case 'email':
                return 'Валідна e-mail адреса'
            case 'tel':
                return 'Номер телефону у форматі 999-999-99-99'
            default: return 'Не валідний набір символів'
        }
    }

    const getTitle = () => {
        switch (type){
            case 'name':
                return 'Валідне'
            case 'numeric':
                return 'Число'
            case 'date':
                return 'Дата'
            case 'email':
                return 'E-mail'
            case 'tel':
                return 'Номер телефону'
            default: return 'Не валідне'
        }
    }

    return (
        <div className={'token-container'}>
            <div style={{display:'flex', alignItems: 'center'}}>
                <Label as='a' color={getColor()} tag>
                    {getTitle()}
                </Label>
                <p className={'token-title'}>{token}</p>
            </div>
            <p className={'token-description'}>{getDescription()}</p>
        </div>
    )
}

Token.propTypes = {
    token: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Token
