import * as types from '../type/lanTyps';

const initialState = {
    lan: 'zh'
};

export default function changelan(state = initialState, action = {}) {
    switch (action.type) {
        case types.EN:
            i18n.locale = 'en';
            LAN = false;
            return {
                ...state,
                lan: 'en'
            };
        case types.ZH:
            i18n.locale = 'zh';
            LAN = true;
            return {
                ...state,
                lan: 'zh'
            };
        default:
            return state;
    }
}