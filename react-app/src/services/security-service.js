import http from './axios-common';

export function getUserFromEmail(email) {
    return http.get("/users/email/" + email)
}

export function getAllSecurities(userId) {
    return http.post("/security/userBooks/" + userId);
}

export function getIssuerNames(userId) {
    return http.get("/security/security-issuer/" + userId);
}

export function getSecuritiesByDateTypeIssuer(filterParams) {
    return http.post("/security/date_range/issuer_name/type", filterParams
    )
}

export function getSecuritiesByIssuerName(filterParams) {
    return http.post("/security/issuer_name",filterParams
    )
}

function parseParams(params) {
    const keys = Object.keys(params)
    let options = ''

    keys.forEach((key) => {
        const isParamTypeObject = typeof params[key] === 'object'
        const isParamTypeArray = isParamTypeObject && params[key].length >= 0

        if (!isParamTypeObject) {
            options += `${key}=${params[key]}&`
        }

        if (isParamTypeObject && isParamTypeArray) {
            params[key].forEach((element) => {
                options += `${key}=${element}&`
            })
        }
    })

    return options ? options.slice(0, -1) : options
}
