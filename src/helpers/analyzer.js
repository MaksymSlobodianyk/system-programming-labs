const analyzeText = (text) => {
    text = text.replaceAll(/\t+/g, "☠\t☠")
    text = text.replaceAll(/\n+/g, "☠\n☠")
    text = text.replaceAll(/ +/g, "☠ ☠")
    text = text.replaceAll(/\!/g, "☠!☠")
    text = text.replaceAll(/,/g, "☠,☠")
    text = text.replaceAll(/:/g, "☠:☠")
    text = text.replaceAll(/;/g, "☠;☠")
    text = text.replaceAll(/\?/g, "☠?☠")
    text = text.replaceAll(/\(/g, "☠(☠")
    text = text.replaceAll(/\)/g, "☠)☠")
    text = text.replaceAll(/\"/g, "☠\"☠")
    text = text.replaceAll(/\'/g, "☠'☠")
    return parseAndProcess(text)
}

const parseAndProcess = text => {
    const localResult = [];
    const tokens = text.split(/☠/).filter(token => token !== '')
    tokens.forEach(token => {
        analyze(token).forEach(res =>
            localResult.push(res)
        )
    })
    return localResult
}
const analyze = token => {
    if (token.toLowerCase().match(/^[слобдяник]+$/)) {
        return [{
            token: token,
            type: 'valid',
            color: 'green',
            description: `Складається з символів ['c', 'л', 'о', 'б', 'д', 'я', 'н', 'и', 'к']`
        }]
    } else if (token.toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        return [{
            token: token,
            type: 'email',
            color: 'yellow',
            description: `Валідна e-mail адреса`
        }]
    } else if (token.toLowerCase().match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)) {
        return [{
            token: token,
            type: 'date',
            color: 'blue',
            description: `Дата в форматі dd/mm/yyyy`
        }]
    } else if (token.toLowerCase().match(/^[\s,\.\!:;\?\(\)\"\'\-\/]$/)) {
        return [{
            token: token,
            type: 'separator',
            color: 'violet',
            description: ``
        }]
    } else if (token.toLowerCase().match(/^[0-9]{3}[-][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/)) {
        return [{
            token: token,
            type: 'tel',
            color: 'pink',
            description: `Номер телефону у форматі 999-999-99-99`
        }]
    } else if (token.toLowerCase().match(/^[-+]?\d*\.?\d+$/)) {
        return [{
            token: token,
            type: 'numeric',
            color: 'orange',
            description: `Числа типу   +123,   -123,   123,   +12.4,   -12.4,   12.4`
        }]
    } else {
        const text = token.replaceAll(/\.(?!\d|[A-Za-z])/g, "☠.☠")
        if(text.includes('☠')){
            return parseAndProcess(text)
        }
        return [{
            token: token,
            type: 'invalid',
            color: 'red',
            description: `Не валідний набір символів`
        }]
    }
}


export default analyzeText
