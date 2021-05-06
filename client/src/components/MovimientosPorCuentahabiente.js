import React from 'react';
import { Table, Col, Row, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';


export const MovimientosPorCuentahabientes = () => {



    const [dataD, setDataD] = useState([])
    const [dataC, setDataC] = useState([])
    const [cui, setCui] = useState([])
    const [mes, setMes] = useState([])
    const [año, setAño] = useState([])


    useEffect(() => {
        if (año > 2000) {
            let param = "cui=" + cui + "&fecha1=" + año + '-' + mes + '-' + '01' + "&fecha2=" + año + '-' + mes + '-' + '30'
            console.log(param)

            fetch('http://192.168.191.129:3000/debitoCuentaHabiente?' + param).then(res => {
                return res.json()
            }).then(data => {
                setDataD(data);
                console.log(dataD)
            })

            fetch('http://192.168.191.129:3000/creditoCuentaHabiente?' + param).then(res => {

                return res.json()
            }).then(data => {
                setDataC(data);
                console.log(dataC)
            })
        }
    }, [cui, año, mes])


    return (
        <Container style={{ width: "100%" }}>
            <h2>Movimientos por cuentahabiente</h2>

            <form>
                <label> CUI <input type="text" value={cui} onChange={(event) => { setCui(event.target.value) }} /> </label>
                <label> Mes <input type="number" value={mes} onChange={(event) => { setMes(event.target.value) }} /> </label>
                <label> Año <input type="number" value={año} onChange={(event) => { setAño(event.target.value) }} /> </label>

            </form>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> <b># </b></th>
                        <th> <b>Tipo </b> </th>
                        <th> <b>Nombre1</b> </th>
                        <th> <b>Apellido1</b> </th>
                        <th> <b>CUI_1</b> </th>
                        <th> <b>Email1</b> </th>
                        <th> <b>FechaRegistro1</b> </th>
                        <th> <b>Genero1</b> </th>
                        <th> <b>InstitucionBancaria1</b> </th>
                        <th> <b>Abreviatura1</b> </th>
                        <th> <b>TipoCuenta1</b> </th>
                        <th> <b>SaldoInicial1</b> </th>
                        <th> <b>Nombre2</b> </th>
                        <th> <b>Apellido2</b> </th>
                        <th> <b>CUI_2</b> </th>
                        <th> <b>Email2</b> </th>
                        <th> <b>FechaRegistro2</b> </th>
                        <th> <b>Genero2</b> </th>
                        <th> <b>InstitucionBancaria2</b> </th>
                        <th> <b>Abreviatura2</b> </th>
                        <th> <b>TipoCuenta2</b> </th>
                        <th> <b>SaldoInicial2</b> </th>
                        <th> <b>Monto</b> </th>
                        <th> <b>Fecha</b> </th>
                    </tr>
                </thead>

                <tbody>

                    {dataD.map((cuenta, index) => (
                        <tr >
                            <td> {index + 1} </td>
                            <td>{cuenta.tipo} </td>
                            <td>{cuenta.nombre1}</td>
                            <td>{cuenta.apellido1}</td>
                            <td>{cuenta.cui_1}</td>
                            <td>{cuenta.email1}</td>
                            <td>{cuenta.fecharegistro1}</td>
                            <td>{cuenta.genero1}</td>
                            <td>{cuenta.institucionbancaria1}</td>
                            <td>{cuenta.abreviatura1}</td>
                            <td>{cuenta.tipocuenta1}</td>
                            <td>{cuenta.saldoinicial1}</td>
                            <td>{cuenta.nombre2}</td>
                            <td>{cuenta.apellido2}</td>
                            <td>{cuenta.cui_2}</td>
                            <td>{cuenta.email2}</td>
                            <td>{cuenta.fecharegistro2}</td>
                            <td>{cuenta.genero2}</td>
                            <td>{cuenta.institucionbancaria2}</td>
                            <td>{cuenta.abreviatura2}</td>
                            <td>{cuenta.tipocuenta2}</td>
                            <td>{cuenta.saldoinicial2}</td>
                            <td>{cuenta.monto}</td>
                            <td>{cuenta.fecha}</td>


                        </tr>
                    ))}

                    {dataC.map((cuenta, index) => (
                        <tr >
                            <td> {index + 1} </td>
                            <td>{cuenta.tipo} </td>
                            <td>{cuenta.nombre1}</td>
                            <td>{cuenta.apellido1}</td>
                            <td>{cuenta.cui_1}</td>
                            <td>{cuenta.email1}</td>
                            <td>{cuenta.fecharegistro1}</td>
                            <td>{cuenta.genero1}</td>
                            <td>{cuenta.institucionbancaria1}</td>
                            <td>{cuenta.abreviatura1}</td>
                            <td>{cuenta.tipocuenta1}</td>
                            <td>{cuenta.saldoinicial1}</td>
                            <td>{cuenta.nombre2}</td>
                            <td>{cuenta.apellido2}</td>
                            <td>{cuenta.cui_2}</td>
                            <td>{cuenta.email2}</td>
                            <td>{cuenta.fecharegistro2}</td>
                            <td>{cuenta.genero2}</td>
                            <td>{cuenta.institucionbancaria2}</td>
                            <td>{cuenta.abreviatura2}</td>
                            <td>{cuenta.tipocuenta2}</td>
                            <td>{cuenta.saldoinicial2}</td>
                            <td>{cuenta.monto}</td>
                            <td>{cuenta.fecha}</td>


                        </tr>
                    ))}
                </tbody>

            </Table>

        </Container >
    );
}
