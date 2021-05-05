CREATE KEYSPACE practica3 WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

USE practica3;

-- REPORTE 1. OPERACIONES REALIZADAS POR UN CUENTAHABIENTE

CREATE TABLE operaciones_cuentahabiente_debito(
    Nombre1 text,
    Apellido1 text,
    CUI_1 text,
    Email1 text,
    FechaRegistro1 date,
    Genero1 text,
    InstitucionBancaria1 text,
    Abreviatura1 text,
    TipoCuenta1 text,
    SaldoInicial1 float,
    Nombre2 text,
    Apellido2 text,
    CUI_2 text,
    Email2 text,
    FechaRegistro2 date,
    Genero2 text,
    InstitucionBancaria2 text,
    Abreviatura2 text,
    TipoCuenta2 text,
    SaldoInicial2 float,
    Monto float,
    Fecha timestamp,
    PRIMARY KEY ((CUI_1),  Fecha)
) WITH CLUSTERING ORDER BY (Fecha desc);

COPY operaciones_cuentahabiente_debito(Nombre1,Apellido1,CUI_1,Email1,FechaRegistro1,Genero1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,SaldoInicial1,
        Nombre2,Apellido2,CUI_2,Email2,FechaRegistro2,Genero2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,SaldoInicial2,Monto,Fecha) 
    FROM  '/home/alfonso/Desktop/BD2_PRACTICA3/operacionesCuentahabiente.csv' WITH HEADER = TRUE AND DELIMITER = ';';


-- REPORTE 2. TOTALES DE CREDITOSY DEBITOS PARA UNA INSTITUCION FINANCIERA.
CREATE TABLE operaciones_institucion_debito(
    Nombre1 text,
    Apellido1 text,
    CUI_1 text,
    InstitucionBancaria1 text,
    Abreviatura1 text,
    TipoCuenta1 text,
    Nombre2 text,
    Apellido2 text,
    CUI_2 text,
    InstitucionBancaria2 text,
    Abreviatura2 text,
    TipoCuenta2 text,
    Monto float,
    Fecha timestamp,
    PRIMARY KEY ((InstitucionBancaria1), Fecha)
) WITH CLUSTERING ORDER BY (Fecha desc);

COPY operaciones_institucion_debito(Nombre1,Apellido1,CUI_1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,Nombre2,Apellido2,CUI_2,InstitucionBancaria2,
    Abreviatura2,TipoCuenta2,Monto,Fecha) 
    FROM  '/home/alfonso/Desktop/BD2_PRACTICA3/operacionesInstitucion.csv' WITH HEADER = TRUE AND DELIMITER = ';';


CREATE TABLE operaciones_institucion_credito(
    Nombre1 text,
    Apellido1 text,
    CUI_1 text,
    InstitucionBancaria1 text,
    Abreviatura1 text,
    TipoCuenta1 text,
    Nombre2 text,
    Apellido2 text,
    CUI_2 text,
    InstitucionBancaria2 text,
    Abreviatura2 text,
    TipoCuenta2 text,
    Monto float,
    Fecha timestamp,
    PRIMARY KEY ((InstitucionBancaria2), Fecha)
) WITH CLUSTERING ORDER BY (Fecha desc);

COPY operaciones_institucion_credito(Nombre1,Apellido1,CUI_1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,Nombre2,Apellido2,CUI_2,InstitucionBancaria2,
    Abreviatura2,TipoCuenta2,Monto,Fecha) 
    FROM  '/home/alfonso/Desktop/BD2_PRACTICA3/operacionesInstitucion.csv' WITH HEADER = TRUE AND DELIMITER = ';';

-- REPORTE 3 CUENTAHABIENTES

CREATE TABLE cuentahabiente(
    Nombre text,
    Apellido text,
    CUI text,
    Email text,
    FechaRegistro date,
    Genero text,
    InstitucionBancaria text,
    TipoCuenta text,
    SaldoInicial float,
    PRIMARY KEY ((CUI),InstitucionBancaria,TipoCuenta)
) WITH CLUSTERING ORDER BY (InstitucionBancaria asc, TipoCuenta asc);

COPY cuentahabiente(Nombre,Apellido,CUI,Email,FechaRegistro,Genero,InstitucionBancaria,TipoCuenta,SaldoInicial) 
    FROM  '/home/alfonso/Desktop/BD2_PRACTICA3/cuentahabientes.csv' WITH HEADER = TRUE AND DELIMITER = ';';

-- REPORTE 4 INSTITUCIONES BANCARIAS

CREATE TABLE institucion_bancaria(
    ID_Institucion int,
    Nombre text,
    Abreviatura text,
    PRIMARY KEY (ID_Institucion)
);

COPY institucion_bancaria(ID_Institucion,Nombre,Abreviatura) 
    FROM  '/home/alfonso/Desktop/BD2_PRACTICA3/instituciones.csv' WITH HEADER = TRUE AND DELIMITER = ';';



-- REPORTE 5 (Utiliza la misma tabla que el reporte 3)

CREATE TABLE operaciones_cuentahabiente_credito(
    Nombre1 text,
    Apellido1 text,
    CUI_1 text,
    Email1 text,
    FechaRegistro1 date,
    Genero1 text,
    InstitucionBancaria1 text,
    Abreviatura1 text,
    TipoCuenta1 text,
    SaldoInicial1 float,
    Nombre2 text,
    Apellido2 text,
    CUI_2 text,
    Email2 text,
    FechaRegistro2 date,
    Genero2 text,
    InstitucionBancaria2 text,
    Abreviatura2 text,
    TipoCuenta2 text,
    SaldoInicial2 float,
    Monto float,
    Fecha timestamp,
    PRIMARY KEY ((CUI_2),  Fecha)
) WITH CLUSTERING ORDER BY (Fecha desc);

COPY operaciones_cuentahabiente_credito(Nombre1,Apellido1,CUI_1,Email1,FechaRegistro1,Genero1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,SaldoInicial1,
    Nombre2,Apellido2,CUI_2,Email2,FechaRegistro2,Genero2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,SaldoInicial2,Monto,Fecha) 
    FROM  '/home/alfonso/Desktop/BD2_PRACTICA3/operacionesCuentahabiente.csv' WITH HEADER = TRUE AND DELIMITER = ';';






