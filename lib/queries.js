module.exports = {
    create_db: `
    create database if not exists chaudiere;
    `,
    create_tables: `
    create table if not exists chaudiere.schedules
    (
    day varchar(10)
    ,special_day varchar(10)
    ,start_time time
    ,stop_time time
    );

    create table if not exists chaudiere.special_days
    (
    special_day varchar(10)
    ,start_date date
    ,stop_date date
    );

    create table if not exists chaudiere.target_temps
    (
    room varchar(20)
    ,eco_temp numeric(5,2)
    ,comfort_temp numeric(5,2)
    );
    `,
    cleanup_tables: `
    truncate table chaudiere.schedules;
    truncate table chaudiere.special_days;
    truncate table chaudiere.target_temps;
    `,
    insert_schedules: `
    insert into chaudiere.schedules (day, special_day, start_time, stop_time) values ?;
    `,
    insert_special_days: `
    insert into chaudiere.special_days (special_day, start_date, stop_date) values ?;
    `,
    insert_target_temps: `
    insert into chaudiere.target_temps (room, eco_temp, comfort_temp) values ?;
    `,
    get_current_target_temps: `
    select a.room,
    case when b.Comfort = 1
        then a.comfort_temp
        else a.eco_temp
    end target_temp
    from chaudiere.target_temps a
    cross join (
        select count(*) Comfort
        from chaudiere.schedules a
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
                end collate utf8_swedish_ci day,
            special_day
            from chaudiere.special_days
            where date(now()) between start_date and stop_date
            order by special_day desc
            limit 1
        ) b on b.day = a.day and b.special_day = a.special_day
        where time(now()) between start_time and stop_time
    ) b
    `
}
