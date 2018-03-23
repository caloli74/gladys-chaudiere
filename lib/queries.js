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
    `
}
