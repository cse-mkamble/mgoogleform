import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from '../../Utils/fetchData';

export const login = (res, fromPathname) => async (dispatch) => {
    var data = { name: res.name, email: res.email, image: res.imageUrl }
    try {
        const res = await postDataAPI('login', data)
        dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user } })
        localStorage.setItem("firstLogin", true);
        if (fromPathname == "/login") {
            window.location.href = "/";
        } else {
            window.location.href = fromPathname;
        }
    } catch (err) {

    }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
        try {
            const res = await postDataAPI('refresh_token')
            dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user } })
        } catch (err) {

        }
    }
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('firstLogin');
    if (token) {
        return true;
    } else {
        return false;
    }
}


export const loginAsGuest = () => async (dispatch) => {
    var userData = {
        name: "Cool Guest",
        id: "y2jsdqakq9rqyvtd4gf6g",
        email: "coolboy69@gg.com"
    }
    try {
        const res = await postDataAPI('login', userData)
        dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user } })
        localStorage.setItem("firstLogin", true);
        window.location.href = "/";
    } catch (err) {

    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout');
    } catch (err) {

    }
}