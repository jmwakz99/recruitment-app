

export const selectCandidate = (candidate) => {
    console.log(candidate)
    return {
        type: 'SELECT_CANDIDATE',
        payload: candidate
    }
}