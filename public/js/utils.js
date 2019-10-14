export const parseJWT = (jwt) => {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    return payload;
}

export const saveUser = (user) => {
    const str = JSON.stringify(user)
    localStorage.setItem('user', str)
}

export const saveToken = token => {
    localStorage.setItem('token', token)
}

export const getUser = () => {
    const str = localStorage.getItem('user')
    return JSON.parse(str)
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const deleteToken = () => {
    localStorage.removeItem('token')
}

export const validateToken = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now()
    
    return (payload.exp - now) > 0
}

export const setCookie = (key, cookie) => {
    document.cookie = key+'='+cookie
}

export const deleteCookie = () => {
    document.cookie = ''
}

export const authRedirect = () => {
    const user = getUser()
    switch (user.role) {
        // ADMIN
        case 0:
            window.location.replace("/admin/dashboard")
            break;
    
        // CS: 1
        default:
            window.location.replace("/user/dashboard")
            break;
    }
}

export const saveCredentials = token => {
    saveToken(token)
    saveUser(parseJWT(token))
}

export const logoutRedirect = () => {
    deleteToken()
    deleteCookie()
    window.location.replace("/")
}

export const string2float = (str) => Number.parseFloat(str)
 
const mapIntToMonth = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "December",
}

export const intMonthToString = (m) => mapIntToMonth[m]

export const defaultFilter = () => {
    const now = new Date()
    let y, m, mb = ""
    y = now.getFullYear()+""
    const month = now.getMonth()+1
    m = month < 10 ? `0${month}` : `${month}`
    const mBefore = month + 1
    mb = mBefore < 10 ? `0${mBefore}` : `${mBefore}`

    const from = `${y}-${m}-01`
    const before = `${y}-${mb}-01`

    return { from, before}
}

export const getAuthHeader = () => "Bearer " + getToken()
