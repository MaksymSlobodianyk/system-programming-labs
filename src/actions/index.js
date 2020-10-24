export const SET_TEXT = 'SET_TEXT'
export const SET_IS_PROCESSING = 'SET_IS_PROCESSING'
export const SET_TOKENS = 'SET_TOKENS'

export const setText = text => ({
    type: 'SET_TEXT',
    text
})

export const setIsProcessing = isProcessing => ({
    type: 'SET_IS_PROCESSING',
    isProcessing
})

export const setTokens = tokens => ({
    type: 'SET_TOKENS',
    tokens
})
