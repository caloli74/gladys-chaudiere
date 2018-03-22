module.exports = {
    create_tables: `
    create database if not exists chaudiere;
    use chaudiere;

    create table schedules
    (
    day varchar(10)
    ,special_day varchar(10)
    ,start_time time
    ,stop_time time
    );

    create table special_days
    (
    special_day varchar(10)
    ,start_date date
    ,stop_date date
    );

    create table target_temp
    (
    room varchar(20)
    ,eco_temp numeric(5,2)
    ,comfort_temp numeric(5,2)
    );
    `
}
