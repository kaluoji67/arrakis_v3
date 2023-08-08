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

export function updateSecurityStatus(id) {
    return http.put("/security/updateStatus/" + id
    )
}
