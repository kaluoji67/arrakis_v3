package com.db.grad.javaapi.Service;

import com.db.grad.javaapi.model.Security;
import com.db.grad.javaapi.repository.SecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.db.grad.javaapi.utils.DateUtils.dateFormatter;

@Service
public class SecurityHandler implements ISecurityService {
    private SecurityRepository securityRepository;
    @Autowired
    public SecurityHandler(SecurityRepository securityRepository) {
        this.securityRepository = securityRepository;
    }
    @Override
    public List<Security> getAllSecurities() {
        return securityRepository.findAll();
    }

    @Override
    public Security addSecurity(Security theSecurity) {
        return securityRepository.save(theSecurity);
    }

    @Override
    public long getNoOfSecurities() {
        return securityRepository.count();
    }

    @Override
    public boolean removeSecurity(long uniqueId) {
        boolean result = false;

        Optional<Security> theSecurity = securityRepository.findById(uniqueId);
        if(theSecurity.isPresent())
        {
            securityRepository.delete(theSecurity.get());
            result = true;
        }

        return result;
    }

    @Override
    public Security getSecurityById(long uniqueId) {
        return securityRepository.findById(uniqueId).get();
    }

    @Override
    public Security getSecurityByIsin(String isin) {
        Security securityToFind = new Security();
        securityToFind.setIsin(isin);
        List<Security> securityList = securityRepository.findByIsin(securityToFind);
        Security result = null;

        if( securityList.size() == 1)
            result = securityList.get(0);

        return result;
    }

    @Override
    public Security updateSecurityDetails(Security securityToUpdate) {
        return securityRepository.save(securityToUpdate);
    }


    public Security updateSecurityStatus(long id) {
        Optional<Security> theSecurity = securityRepository.findById(id);
        if (theSecurity.isPresent()) {
            theSecurity.get().setStatus("processing");
            return securityRepository.save(theSecurity.get());
        } else {
            throw new EntityNotFoundException("Security with ID " + id + " not found");
        }
    }

    public List<Security> getSecuritiesByUserDateRange(long userId, String startDateString, String endDateString) throws IllegalArgumentException {

        LocalDate startDate=LocalDate.parse(startDateString,dateFormatter);
        LocalDate endDate=LocalDate.parse(endDateString,dateFormatter);

        Date startDateSQL=Date.valueOf(startDate);
        Date endDateSQL=Date.valueOf(endDate);

        List<Security> securitiesDueForMaturity = securityRepository.findSecurityByUserDateRange(userId, startDateSQL, endDateSQL);
        return securitiesDueForMaturity;
    }

    public List<Security> getSecuritiesMatchedWithBook(Long user_id){
        List<Security> matchedSec = securityRepository.findSecurityByUserBooks(user_id);
        return matchedSec;
    }

    //API 5

    public List<String> getDistinctSecurityTypesByUserId(Long userId) {
        return securityRepository.findDistinctSecurityTypesByUserId(userId);
    }


    // API 7: Get distinct issuer name in user books issuer_name
    public List<String> getDistinctSecurityIssuerByUserId(Long userId) {
        return securityRepository.findDistinctSecurityIssuerByUserId(userId);
    }

    //API 8: Filter securities by date, issuer name and type
    public List<Security> getSecuritiesByDateIssuerAndType(long userId, String startDateString, String endDateString,
                                                           String issuerName, String Type)
    {
        LocalDate startDate=LocalDate.parse(startDateString,dateFormatter);
        LocalDate endDate=LocalDate.parse(endDateString,dateFormatter);

        Date startDateSQL=Date.valueOf(startDate);
        Date endDateSQL=Date.valueOf(endDate);

        List<Security> filteredSecurities = securityRepository.findSecurityByDateTypeAndIssuer(userId, startDateSQL, endDateSQL, issuerName, Type);
        return filteredSecurities;


    }


}
