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
    `
}
