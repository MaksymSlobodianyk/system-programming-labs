import React from 'react'
import PropTypes from 'prop-types'
import {Label} from "semantic-ui-react";
import styles from './styles.css'

const Token = ({token}) => {

    const getTitle = () => {
        switch (token.type) {
            case 'valid':
                return 'Валідне'
            case 'numeric':
                return 'Число'
            case 'date':
                return 'Дата'
            case 'email':
                return 'E-mail'
            case 'tel':
                return 'Номер телефону'
            case 'separator':
                return 'Роздільник'
            default:
                return 'Не валідне'
        }
    }
    const getSeparatorTitle = () => {
        const title = token.token
        if (title === ' ')
            return '{ Пробіл }'
        else if (title === '\n')
            return '{ Перехід на наступний рядок }'
        else if (title === '\t')
            return '{ Табуляція }'
        else {
            return title
        }
    }

    return (
        <div className={'token-container'}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Label as='a' color={token.color} tag>
                    {getTitle()}
                </Label>
                <p className={'token-title'}>{token.type === 'separator' ? getSeparatorTitle() : token.token}</p>
            </div>
            <p className={'token-description'}>{token.description}</p>
        </div>
    )
}

Token.propTypes = {
    token: PropTypes.object.isRequired,
}

export default Token
