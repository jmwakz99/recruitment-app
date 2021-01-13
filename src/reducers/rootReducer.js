const initState = {
    candidates: [],
    selectedCandidate: false
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SELECT_CANDIDATE':
            return {
                ...state,
                selectedCandidate: action.payload

            }
        default:
            return state
    }
}


export default rootReducer;
