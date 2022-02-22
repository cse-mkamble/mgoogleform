import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = {}

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.FORM:
            return action.payload;
        default:
            return state;
    }
}


export default formReducer