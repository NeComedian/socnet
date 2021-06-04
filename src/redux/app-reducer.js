import {authThunk} from "./auth-reducer";

const SETINITIALISING = 'set-initialise-status'

const initialState = {
    initialized: false
}

export const AppReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SETINITIALISING:
            return {
                ...state,
                initialized: true,
            }
        default:
            return {
                ...state,
            }
    }
}
export const SetInitialising = () => ({type: SETINITIALISING})
export const SetInitialisingThunk = () => (dispatch) =>{
    dispatch(authThunk());
}



