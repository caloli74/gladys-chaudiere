-- create schema chaudiere;
use chaudiere;
-- create table schedule
-- (
-- day varchar(10)
-- ,special_day varchar(10)
-- ,start_time time
-- ,stop_time time
-- );
-- create table special_days
-- (
-- special_day varchar(10)
-- ,start_date date
-- ,stop_date date
-- );
-- 
-- truncate table schedule;
-- INSERT INTO schedule
-- VALUES
-- ('monday', '', '05:00', '07:00'),
-- ('monday', '', '17:00', '22:00'),
-- ('tuesday', '', '05:00', '07:00'),
-- ('tuesday', '', '17:00', '22:00'),
-- ('wednesday', '', '05:00', '07:00'),
-- ('wednesday', '', '12:00', '22:00'),
-- ('thursday', '', '05:00', '07:00'),
-- ('thursday', '', '17:00', '22:00'),
-- ('friday', '', '05:00', '07:00'),
-- ('friday', '', '17:00', '23:00'),
-- ('saturday', '', '09:00', '23:00'),
-- ('sunday', '', '09:00', '22:00'),
-- ('firstday', 'away', '05:00', '07:00'),
-- ('during', 'away', '00:00', '00:00'),
-- ('lastday', 'away', '21:00', '23:00'),
-- ('all', 'holiday', '05:00', '07:00'),
-- ('monday', 'HO', '05:00', '22:00'),
-- ('tuesday', 'HO', '05:00', '22:00'),
-- ('wednesday', 'HO', '05:00', '22:00'),
-- ('thursday', 'HO', '05:00', '22:00'),
-- ('friday', 'HO', '05:00', '23:00');
-- 
-- truncate table special_days;
-- INSERT INTO special_days
-- VALUES
-- ('', '1900-01-01', '2099-12-31'),
-- ('away', '2018-03-16', '2018-03-18'),
-- ('HO', '2018-03-21', '2018-03-21'),
-- ('holiday', '2018-02-20', '2018-02-27');
-- 
-- create table target_temp
-- (
-- room varchar(20)
-- ,eco_temp numeric(5,2)
-- ,comfort_temp numeric(5,2)
-- );
-- 
-- truncate table target_temp;
-- INSERT INTO target_temp
-- VALUES
-- ('salon', 19, 21),
-- ('Chambre', 18, 20),
-- ('Chambre enfants', 18, 20);
-- 

select a.room,
case when b.Comfort = 1
    then a.comfort_temp
    else a.eco_temp
end target_temp
from target_temp a
cross join (
    select count(*) Comfort
    from schedule a
    inner join (
        select
        case special_day
            when 'holiday' then 'all'
            when 'away' then case
                when date(now()) = start_date then 'firstday'
                when date(now()) = stop_date then 'lastday'
                else 'during'
                end
            else dayname(now())
            end day,
        special_day
        from special_days
        where date(now()) between start_date and stop_date
        order by special_day desc
        limit 1
    ) b on b.day = a.day and b.special_day = a.special_day
    where time(now()) between start_time and stop_time
) b