const initState = {
    selectedCandidate: false,
    loader: false
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SELECT_CANDIDATE':
            return {
                ...state,
                selectedCandidate: action.payload

            }
        case 'TOGGLE_LOADER':
            return {
                ...state,
                loader: action.payload

            }
        default:
            return state
    }
}


export default rootReducer;
