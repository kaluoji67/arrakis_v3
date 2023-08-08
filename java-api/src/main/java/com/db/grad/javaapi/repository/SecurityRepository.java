package com.db.grad.javaapi.repository;

import com.db.grad.javaapi.model.Security;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
public interface SecurityRepository extends JpaRepository<Security,Long> {
    @Query(nativeQuery = true, value = "select * from security where isin = :isin")
    List<Security> findByIsin(Security isin);

    @Query(nativeQuery = true, value = "select * from security s where s.maturity_date >= startDate and s.maturity_date<=endDate ")
    List<Security> findByMaturityDateBetween(LocalDate startDate, LocalDate endDate);


    @Query(nativeQuery = true, value = "select * from security where id in" +
            "        (select distinct(security_id) from trades\n" +
            "        where book_id in\n" +
            "        (Select book_id from users\n" +
            "        join\n" +
            "        book_users on\n" +
            "        users.id =book_users.users_id\n" +
            "        and users.id = :userID\n" +
            "        join\n" +
            "        book on book.id = book_users.book_id)\n" +
            "        )")
    List<Security> findSecurityByUserBooks(long userID);

    @Query(nativeQuery = true, value = "select * from security where maturity_date <= :endDate and maturity_date >= :startDate and id in" +
            "        (select distinct(security_id) from trades\n" +
            "        where book_id in\n" +
            "        (Select book_id from users\n" +
            "        join\n" +
            "        book_users on\n" +
            "        users.id =book_users.users_id\n" +
            "        and users.id = :userID\n" +
            "        join\n" +
            "        book on book.id = book_users.book_id)\n" +
            "        )")
    List<Security> findSecurityByUserDateRange(long userID, Date startDate, Date endDate);


    //API 5
    @Query(nativeQuery = true, value = "select distinct(type) from security where id in" +
            "        (select distinct(security_id) from trades\n" +
            "        where book_id in\n" +
            "        (Select book_id from users\n" +
            "        join\n" +
            "        book_users on\n" +
            "        users.id =book_users.users_id\n" +
            "        and users.id = :userId\n" +
            "        join\n" +
            "        book on book.id = book_users.book_id)\n" +
            "        )")
    List<String> findDistinctSecurityTypesByUserId(long userId);

    @Query(nativeQuery = true, value = "select distinct(issuer_name) from security where id in" +
            "        (select distinct(security_id) from trades\n" +
            "        where book_id in\n" +
            "        (Select book_id from users\n" +
            "        join\n" +
            "        book_users on\n" +
            "        users.id =book_users.users_id\n" +
            "        and users.id = :userId\n" +
            "        join\n" +
            "        book on book.id = book_users.book_id)\n" +
            "        )")
    List<String> findDistinctSecurityIssuerByUserId(long userId);



    @Query(nativeQuery = true, value = "select * from security where (maturity_date <= :endDate and maturity_date >= :startDate) and id in" +
            "        (select distinct(security_id) from trades\n" +
            "        where book_id in\n" +
            "        (Select book_id from users\n" +
            "        join\n" +
            "        book_users on\n" +
            "        users.id =book_users.users_id\n" +
            "        and users.id = :userId\n" +
            "        join\n" +
            "        book on book.id = book_users.book_id)\n" +
            "        ) and issuer_name in :issuerName or type in :type")
    List<Security> findSecurityByDateTypeAndIssuer(long userId, Date startDate, Date endDate, List<String> issuerName, List<String> type);


    @Query(nativeQuery = true, value = "select * from security where id in" +
            "        (select distinct(security_id) from trades\n" +
            "        where book_id in\n" +
            "        (Select book_id from users\n" +
            "        join\n" +
            "        book_users on\n" +
            "        users.id =book_users.users_id\n" +
            "        and users.id = :userId\n" +
            "        join\n" +
            "        book on book.id = book_users.book_id)\n" +
            "        ) and issuer_name in :issuerName")
    List<Security> getSecuritiesByIssuerName(long userId, List<String> issuerName);
}


/* select * from security where id in
        (select distinct(security_id) from trade
        where book_id in
        (Select book_id from users
        join
        book_users on
        users.id =book_users.users_id
        and users.id = :userID
        join
        book on book.id = book_users.book_id)
        )
       */
