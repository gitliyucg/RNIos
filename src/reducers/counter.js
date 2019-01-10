import * as types from '../actions/actionTypes';

const initialState = {
    count: 0
};

export default function counter(state = initialState, action = {}) {
    switch (action.type) {
        case types.INCREMENT:
            i18n.locale = 'zh';
            return {
                ...state,
                count: state.count + 1
            };
        case types.DECREMENT:
            i18n.locale = 'en';
            return {
                ...state,
                count: state.count - 1
            };
        default:
            return state;
    }
}
