import React from 'react';
import { Dropdown, DropdownButton, Table, Col, Row, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
const axios = require('axios').default;

export const IngresarTransaccion = () => {

    const [Monto, setMonto] = useState([])
    const [Cuentas, setCuentas] = useState([])
    const [Cuenta1, setCuenta1] = useState([])
    const [Cuenta2, setCuenta2] = useState([])
    const [r, setR] = useState([])


    useEffect(() => {


        fetch('http://192.168.191.129:3000/cuentahabientes').then(res => {
            return res.json()
        }).then(data => {
            setCuentas(data);
            console.log(Cuentas)
        })



    }, [Cuenta1, Cuenta2,r])


    return (
        <Container style={{ width: "100%" }}>
            <h2>Movimientos por cuentahabiente</h2>
            <br />
            <select value={Cuenta1} onChange={(event) => { setCuenta1(event.target.value) }} id="db_1" title="Cuenta Origen">

                {Cuentas.map((cuenta, index) => (
                    <option> {cuenta.cui}|{cuenta.nombre}|{cuenta.apellido}|{cuenta.email}|{cuenta.fecharegistro}|{cuenta.genero}|{cuenta.institucionbancaria}|{cuenta.saldoinicial}|{cuenta.tipocuenta}</option>
                ))}

            </select>
            <br />

            <label>Saldo cuenta origen {Cuenta1.toString().split('|')[7]} </label>
            <br />
            <select value={Cuenta2} onChange={(event) => { setCuenta2(event.target.value) }} id="db_2" title="Cuenta Destino">

                {Cuentas.map((cuenta, index) => (
                    <option> {cuenta.cui}|{cuenta.nombre}|{cuenta.apellido}|{cuenta.email}|{cuenta.fecharegistro}|{cuenta.genero}|{cuenta.institucionbancaria}|{cuenta.saldoinicial}|{cuenta.tipocuenta}</option>
                ))}

            </select>
            <br />
            <label>Saldo cuenta destino {Cuenta2.toString().split('|')[7]} </label>
            <br />

            <label> Monto <input type="number" value={Monto} onChange={(event) => { setMonto(event.target.value) }} /> </label>
            <br />
            <label> <button onClick={(event) => {
                if (parseFloat(Monto) > parseFloat(Cuenta1.toString().split('|')[7])) {
                    alert('No se puede realizar la transferencia. Saldo actual menor al monto de transferencia.')
                } else {
                    const post = {
                        Nombre1: Cuenta1.toString().split('|')[1],
                        Apellido1: Cuenta1.toString().split('|')[2],
                        CUI_1: Cuenta1.toString().split('|')[0],
                        Email1: Cuenta1.toString().split('|')[3],
                        FechaRegistro1: Cuenta1.toString().split('|')[4],
                        Genero1: Cuenta1.toString().split('|')[5],
                        InstitucionBancaria1: Cuenta1.toString().split('|')[6],
                        Abreviatura1: '',
                        TipoCuenta1: Cuenta1.toString().split('|')[8],
                        SaldoInicial1: parseFloat(Cuenta1.toString().split('|')[7]) - parseFloat(Monto),
                        Nombre2: Cuenta2.toString().split('|')[1],
                        Apellido2: Cuenta2.toString().split('|')[2],
                        CUI_2: Cuenta2.toString().split('|')[0],
                        Email2: Cuenta2.toString().split('|')[3],
                        FechaRegistro2: Cuenta2.toString().split('|')[4],
                        Genero2: Cuenta2.toString().split('|')[5],
                        InstitucionBancaria2: Cuenta2.toString().split('|')[6],
                        Abreviatura2: '',
                        TipoCuenta2: Cuenta2.toString().split('|')[8],
                        SaldoInicial2: parseFloat(Cuenta2.toString().split('|')[7]) + parseFloat(Monto),
                        Monto: parseFloat(Monto)
                    }

                    console.log(post)
                    axios.post('http://192.168.191.129:3000/registrarOperacionCuentahabienteDebito',post).then(response => { setR(response); alert('Registro insertado con exito'); });

                }
            }} > Guardar </button> </label>







        </Container >
    );
}
