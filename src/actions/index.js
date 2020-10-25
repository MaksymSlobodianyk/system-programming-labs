export const SET_TEXT = 'SET_TEXT'
export const TOGGLE_SHOW_INFO = 'TOGGLE_SHOW_INFO'
export const SET_TOKENS = 'SET_TOKENS'
export const SET_SORT_BY = 'SET_SORT_BY'

export const setText = text => ({
    type: 'SET_TEXT',
    text
})

export const toggleShowInfo = () => ({
    type: 'TOGGLE_SHOW_INFO'
})

export const setSortBy = sortBy => ({
    type: 'SET_SORT_BY',
    sortBy
})

export const setTokens = tokens => (
    {
        type: 'SET_TOKENS',
        tokens
    })
