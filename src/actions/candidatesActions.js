export const selectCandidate = (candidate) => {
    return {
        type: 'SELECT_CANDIDATE',
        payload: candidate
    }
}