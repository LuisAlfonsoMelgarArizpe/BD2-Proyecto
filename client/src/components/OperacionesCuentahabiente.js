import React from 'react';
import { Table, Col, Row, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';


export const OperacionesCuentahabientes = () => {



    const [data, setData] = useState([])
    const [cui, setCui] = useState([])


    useEffect(() => {
        fetch('http://192.168.191.129:3000/operacionesCuentahabiente?cui=' + cui).then(res => {
            console.log(cui)
            return res.json()
        }).then(data => {
            setData(data);
            console.log(data)
        })

    }, [cui])


    return (
        <Container style={{ width: "100%" }}>
            <h2>Operaciones por Cuentahabientes</h2>

            <form>
                <label> CUI <input type="cui" value={cui} onChange={(event) => { setCui(event.target.value) }} /> </label>

            </form>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> <b># </b></th>
                        <th> <b>Nombre1 </b></th>
                        <th> <b>Apellido1 </b></th>
                        <th> <b>CUI_1 </b></th>
                        <th> <b>Email1 </b></th>
                        <th> <b>FechaRegistro1 </b></th>
                        <th> <b>Genero1 </b></th>
                        <th> <b>InstitucionBancaria1 </b></th>
                        <th> <b>Abreviatura1 </b></th>
                        <th> <b>TipoCuenta1 </b></th>
                        <th> <b>SaldoInicial1 </b></th>
                        <th> <b>Nombre2 </b></th>
                        <th> <b>Apellido2 </b></th>
                        <th> <b>CUI_2 </b></th>
                        <th> <b>Email2 </b></th>
                        <th> <b>FechaRegistro2 </b></th>
                        <th> <b>Genero2 </b></th>
                        <th> <b>InstitucionBancaria2 </b></th>
                        <th> <b>Abreviatura2 </b></th>
                        <th> <b>TipoCuenta2 </b></th>
                        <th> <b>SaldoInicial2 </b></th>
                        <th> <b>Monto </b></th>
                        <th> <b>Fecha </b></th>
                    </tr>
                </thead>

                <tbody>

                    {data.map((cuenta, index) => (
                        <tr >
                            <td> {index + 1} </td>
                            <td> {cuenta.nombre1} </td>
                            <td> {cuenta.apellido1} </td>
                            <td> {cuenta.cui_1} </td>
                            <td> {cuenta.email1} </td>
                            <td> {cuenta.fecharegistro1} </td>
                            <td> {cuenta.genero1} </td>
                            <td> {cuenta.institucionbancaria1} </td>
                            <td> {cuenta.abreviatura1} </td>
                            <td> {cuenta.tipocuenta1} </td>
                            <td> {cuenta.saldoinicial1} </td>
                            <td> {cuenta.nombre2} </td>
                            <td> {cuenta.apellido2} </td>
                            <td> {cuenta.cui_2} </td>
                            <td> {cuenta.email2} </td>
                            <td> {cuenta.fecharegistro2} </td>
                            <td> {cuenta.genero2} </td>
                            <td> {cuenta.institucionbancaria2} </td>
                            <td> {cuenta.abreviatura2} </td>
                            <td> {cuenta.tipocuenta2} </td>
                            <td> {cuenta.saldoinicial2} </td>
                            <td> {cuenta.monto} </td>
                            <td> {cuenta.fecha} </td>

                        </tr>
                    ))}
                </tbody>

            </Table>

        </Container >
    );
}
