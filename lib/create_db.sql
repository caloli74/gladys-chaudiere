create database if not exists chaudiere;

drop table if exists chaudiere.schedules;
create table chaudiere.schedules
(
day varchar(10)
,special_day varchar(10)
,start_time time
,stop_time time
);
drop table if exists chaudiere.special_days;
create table chaudiere.special_days
(
special_day varchar(10)
,start_date date
,stop_date date
);
drop table if exists chaudiere.target_temps;
create table chaudiere.target_temps
(
room varchar(20)
,eco_temp numeric(5,2)
,comfort_temp numeric(5,2)
);