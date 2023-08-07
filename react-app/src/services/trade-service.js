import http from './axios-common';

export function getAllTrades(securityIds){
    return http.post("/trades/securityIDs",securityIds);
}

