module.exports = {
    create_tables: `
    create database if not exists chaudiere;
    use chaudiere;

    drop table if exists schedules;
    create table schedules
    (
    day varchar(10)
    ,special_day varchar(10)
    ,start_time time
    ,stop_time time
    );

    drop table if exists special_days;
    create table special_days
    (
    special_day varchar(10)
    ,start_date date
    ,stop_date date
    );

    drop table if exists target_temps;
    create table target_temps
    (
    room varchar(20)
    ,eco_temp numeric(5,2)
    ,comfort_temp numeric(5,2)
    );
    `
}
