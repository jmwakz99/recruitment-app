export const toggleLoader = (status) => {
    return {
        type: 'TOGGLE_LOADER',
        payload: status
    }
}