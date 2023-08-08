package com.db.grad.javaapi.controller;

import com.db.grad.javaapi.Service.SecurityHandler;
import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.FilterParams;
import com.db.grad.javaapi.model.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/api/v1")


public class SecurityController {

    SecurityHandler securityHandler;
    @Autowired
    public SecurityController(SecurityHandler securityHandler) {
        this.securityHandler = securityHandler;
    }

    @GetMapping("/security")
    public List<Security> getAllSecurity() {
        return securityHandler.getAllSecurities();
    }

    @PostMapping("/security/")
    public Security createSecurity(@RequestBody Security Security) {
        return securityHandler.addSecurity(Security);
    }

    @PutMapping("/Security/update/{id}")
    public ResponseEntity < Security > updateSecurity(@PathVariable(value = "id") Long id,
                                                      @Valid @RequestBody Security SecurityDetails) throws ResourceNotFoundException {

        final Security updatedSecurity = securityHandler.updateSecurityDetails(SecurityDetails);
        return ResponseEntity.ok(updatedSecurity);
    }

    @DeleteMapping("/security/{id}")
    public Map< String, Boolean > deleteUser(@PathVariable(value = "id") long id)
            throws ResourceNotFoundException {
        boolean removed = securityHandler.removeSecurity(id);

        Map < String, Boolean > response = new HashMap<>();
        if( removed )
            response.put("deleted", Boolean.TRUE);
        else
            response.put("deleted", Boolean.FALSE);

        return response;}

    @PostMapping("/security/userBooks/{user_id}")
    public List<Security> getSecuritiesMatchedWithBook(@PathVariable(value = "user_id") long id)
            throws ResourceNotFoundException {
        List<Security> security = securityHandler.getSecuritiesMatchedWithBook(id);
        return security;
    }

    @GetMapping("/security/date_range")
    public ResponseEntity < ? > getSecuritiesCustomRange(@RequestParam long user, @RequestParam String startDate,@RequestParam String endDate)
            throws ResourceNotFoundException {
       try{
           List<Security> securityList = securityHandler.getSecuritiesByUserDateRange(user,startDate,endDate);

           return ResponseEntity.ok().body(securityList);
       }
       catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage()+" Invalid Date Range or User!");
       }

    }
    //API 5

    @GetMapping("/security/security-issuer/{userId}")
    public ResponseEntity<?> getDistinctSecurityIssuerByUserId(@PathVariable(value = "userId") long userId)
            throws ResourceNotFoundException {
        List<String> issuerNames = securityHandler.getDistinctSecurityIssuerByUserId(userId);
        return ResponseEntity.ok().body(issuerNames);
    }


    @PostMapping("/security/date_range/issuer_name/type")
    public ResponseEntity < ? > getSecuritiesByDateIssuerNameAndType(@RequestBody FilterParams filterParams)
            throws ResourceNotFoundException {
        try{
            long user = filterParams.getUser();
            String startDate = filterParams.getDateRange().getStartDateString();
            String endDate = filterParams.getDateRange().getEndDateString();
            List<String> issuerName = filterParams.getIssuerName();
            List<String> type = filterParams.getType();

            List<Security> securityList = securityHandler.getSecuritiesByDateIssuerAndType(user,startDate,endDate, issuerName, type);
            return ResponseEntity.ok().body(securityList);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage()+" Invalid Date Range, User, Type , or Issuer Name!");
        }
    }

    @PostMapping("/security/issuer_name")
    public ResponseEntity < ? > getSecuritiesByIssuerName(@RequestBody FilterParams filterParams)
            throws ResourceNotFoundException {
        try{
            long user = filterParams.getUser();
            List<String> issuerName = filterParams.getIssuerName();
            List<Security> securityList = securityHandler.getSecuritiesByIssuerName(user,issuerName);
            return ResponseEntity.ok().body(securityList);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage()+" Invalid Date Range, User, Type , or Issuer Name!");
        }
    }


    @PutMapping("/security/updateStatus/{id}")
    public ResponseEntity<Boolean> updateSecurityStatus(@PathVariable(value = "id") long id) throws ResourceNotFoundException {

        final boolean updatedSecurity = securityHandler.updateSecurityStatus(id);
        return ResponseEntity.ok(updatedSecurity);
    }

}