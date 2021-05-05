-- REPORTE 1. OPERACIONES REALIZADAS POR UN CUENTAHABIENTE
select * from operaciones_cuentahabiente_debito where CUI_1 = '1485345081';

-- REPORTE 2. TOTALES DE CREDITOSY DEBITOS PARA UNA INSTITUCION FINANCIERA.
-- Detalles
select blobAsText(textAsBlob('Debito')) as Tipo, Nombre1,Apellido1,CUI_1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,Nombre2,Apellido2,CUI_2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,Monto,Fecha 
    from operaciones_institucion_debito where InstitucionBancaria1 = 'Banco G&T' order by fecha desc;

select blobAsText(textAsBlob('Credito')) as Tipo, Nombre1,Apellido1,CUI_1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,Nombre2,Apellido2,CUI_2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,Monto,Fecha 
    from operaciones_institucion_credito where InstitucionBancaria2 = 'Banco G&T' order by fecha desc;

--Totales
select blobAsText(textAsBlob('Debito')) as Tipo, SUM(MONTO)
    from operaciones_institucion_debito where InstitucionBancaria1 = 'Banco G&T' ;

select blobAsText(textAsBlob('Credito')) as Tipo, SUM(MONTO)
    from operaciones_institucion_credito where InstitucionBancaria2 = 'Banco G&T';

-- REPORTE 3. CUENTAHABIENTES
SELECT * from cuentahabiente;

-- REPORTE 4. INSTITUCIONES BANCARIAS
SELECT * from institucion_bancaria;

-- REPORTE 5 MOVIMIENTOS POR CUENTAHABIENTE POR MES
select blobAsText(textAsBlob('Debito')) ,Nombre1,Apellido1,CUI_1,Email1,FechaRegistro1,Genero1,InstitucionBancaria1,
        Abreviatura1,TipoCuenta1,SaldoInicial1,Nombre2,Apellido2,CUI_2,Email2,
        FechaRegistro2,Genero2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,SaldoInicial2,Monto,Fecha 
        from operaciones_cuentahabiente_debito where CUI_1 = '930849132' and fecha >= '2020-04-01' and fecha <= '2020-04-30';

select blobAsText(textAsBlob('Credito')) ,Nombre1,Apellido1,CUI_1,Email1,FechaRegistro1,Genero1,InstitucionBancaria1,
        Abreviatura1,TipoCuenta1,SaldoInicial1,Nombre2,Apellido2,CUI_2,Email2,
        FechaRegistro2,Genero2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,SaldoInicial2,Monto,Fecha 
        from operaciones_cuentahabiente_credito where CUI_2 = '930849132' and fecha >= '2020-04-01' and fecha <= '2020-04-30';

