import http from './axios-common';

export function getAllTradesBySecurityId(securityIds){
    return http.post("/trades/securityIDs",securityIds);
}

export function getAllTrades(){
    return http.get("/trades");
}
