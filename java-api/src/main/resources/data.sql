INSERT into book
    (name)
values
    ('Trading_book_1'),
    ('Trading_book_2'),
    ('Trading_book_3'),
    ('Trading_book_4'),
    ('Trading_book_5'),
    ('Trading_book_6')
;

INSERT into counterparty
    (name)
values
    ('AZ Holdings Inc'),
    ('Acme co'),
    ('Sovereign Investments'),
    ('Astra Trading Ltd'),
    ('Muncipal Gov Of Orange County'),
    ('Goldman Sachs'),
    ('UBS'),
    ('Barclays'),
    ('British Telecom'),
    ('Pension Holdings'),
    ('Zurich Pension fund 4')
;

INSERT into security
    (isin,cusip,issuer_name,maturity_date,coupon,type,face_value,currency,status)
values
    ('XS1988387210',' ','BNPParibasIssu 4,37% Microsoft Corp (USD)', '2021-08-05' , 4.37 , 'CORP' , 1000 , 'USD' , 'active' ),
    ('USN0280EAR64','123456780','Airbus 3.15%  USD', '2021-07-30' , 3.15 , 'CORP' , 900 , 'USD' , 'active' ),
    ('A12356111', '123456bh0' , 'UBS Facebook (USD)' , '2021-09-30' , 2 , 'CORP' , 900 , 'USD' , 'active'),
    ('USU02320AG12' , 'AMZN 3.15 08/22/27 REGS' , 'Amazon' , '2021-08-03' , 3.15 , 'CORP' , 900 , 'USD' , 'active'),
    ('GB00B6460505' , 'BDCHBW8' , 'HM Treasury United Kingdon' , '2021-08-09' , 0.75, 'GOVN' , 900 ,'GBP', 'active'),
    ('US87973RAA86' , '87973RAA8' , 'TEMASEK FINL I LTD GLOBAL MEDIUM TERM NTS BOOK ENTRY REG S' , '2021-08-06' , 2.02 , 'SOVN' , 690 ,'USD', 'active'),
    ('IE00B29LNP31', '87973RAA8' , 'First Norway Alpha Kl.IV' , '2030-12-22' , 1.123 , 'SOVN' , 340, 'USD', 'active'),
    ('P31TYGH67', '9ojjuj' , 'First Norway Alpha Kl.IV' , '2023-08-05' , 1.103 , 'OPBN' , 340, 'USD', 'active')
;

INSERT into users
    (name,email,role)
values
    ('Alex Apostol' , 'alexboss123@mail.com' , 'editor'),
    ('Haida Lu' , 'haidacoolestguy@mail.com' , 'admin'),
    ('Kalu Kalu' , 'kaluthechief@email.com' , 'admin'),
    ('Unays Angus' , 'unaythesemperor@gmail.com' , 'admin'),
    ('Andreea Vancea' , 'andreeathequeen@email.com' , 'admin')
;
INSERT into book_users
    (book_id, users_id)
   values
   (1, 1),
   (1, 2),
   (1, 3),
   (2, 3),
   (3, 3),
   (4, 3),
   (5, 3),
   (6, 3),
   (2, 2),
   (3, 1),
   (2, 4),
   (1, 5)
;

INSERT into trades
    (book_id,security_id,counterparty_id,currency,status,quantity,unit_price,buy_sell,trade_date,settlement_date)
values
    (1,1,1,'USD','open',50,90,'buy','2021-05-13','2021-08-04'),
    (1,1,1,'GBP','open',40,89.56,'sell','2021-02-04','2021-08-04'),
    (2,2,2,'USD','open',1000, 105.775,'buy','2021-05-13','2021-08-23'),
    (2,2,2,'GPB','open',900,105.775,'sell','2021-02-04','2021-09-10'),
    (3,3,3,'USD','open',50, 90,'buy','2021-06-13','2021-08-23'),
    (2,2,4,'USD','open',1000, 105.775,'buy','2021-05-13','2021-08-23'),
    (2,3,3,'USD','open',50, 90,'sell','2021-05-13','2021-08-23'),
    (4,4,5,'GBP','open',60, 98.56,'buy','2021-02-04','2021-09-27'),
    (4,4,5,'USD','open',50, 98.56,'buy','2021-08-23','2021-08-23'),
    (6,5,6,'GBP','open',1100, 110.35,'buy','2021-09-27','2021-09-27'),
    (6,5,6,'GBP','open',900, 110.35,'sell','2021-09-28','2021-09-28'),
    (6,5,7,'GBP','open',2000, 110.35,'buy','2021-09-29','2021-09-29'),
    (6,5,7,'GBP','open',2000, 110.35,'sell','2021-09-30','2021-09-30'),
    (6,5,8,'GBP','open',1000, 110.35,'buy','2021-10-01','2021-10-01'),
    (6,5,8,'GBP','open',900, 110.35,'buy','2019-10-02','2019-10-02'),
    (6,5,8,'GBP','open',1900, 110.35,'sell','2019-10-03','2019-10-03'),
    (6,5,9,'GBP','open',600, 110.35,'buy','2018-10-04','2018-10-04'),
    (6,5,10,'GBP','open',600, 110.35,'buy','2019-10-05','2019-10-05'),
    (6,5,10,'GBP','open',700, 110.35,'buy','2021-10-05','2021-06-06'),
    (6,5,10,'GBP','open',700, 110.35,'sell','2011-10-07','2021-10-07'),
    (4,6,11,'USD','open',60, 100.13,'buy','2012-02-04','2021-09-27'),
    (4,6,11,'USD','open',50, 100.13,'buy','2012-08-23','2021-08-23'),
    (4,6,11,'USD','open',75, 100.13,'buy','2013-02-04','2021-09-27'),
    (4,6,11,'USD','open',50, 100.13,'buy','2014-08-23','2021-08-23'),
    (4,7,11,'USD','open',300, 98.76,'buy','2016-02-04','2021-09-27'),
    (4,7,11,'USD','open',300, 98.76,'buy','2012-08-23','2021-08-23'),
    (4,7,11,'USD','open',300, 98.76,'buy','2013-02-04','2021-09-27'),
    (4,7,11,'USD','open',300, 98.76,'sell','2015-08-23','2021-08-23'),
    (4,8,11,'USD','open',900, 98.76,'buy','2023-08-07','2023-08-23')

;