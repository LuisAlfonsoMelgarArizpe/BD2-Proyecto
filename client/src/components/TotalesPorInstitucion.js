import React from 'react';
import { Table, Col, Row, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';


export const TotalesPorInstitucion = () => {



    const [dataD, setDataD] = useState([])
    const [dataC, setDataC] = useState([])
    const [institucion, setInstitucion] = useState([])


    useEffect(() => {
        fetch('http://192.168.191.129:3000/totalDebitosInstitucion?institucion=' + institucion.toString().replace("&", "%26")).then(res => {
            //console.log(institucion.replace("&","%26"))
            return res.json()
        }).then(data => {
            setDataD(data);
            console.log(dataD)
        })

        fetch('http://192.168.191.129:3000/totalCreditosInstitucion?institucion=' + institucion.toString().replace("&", "%26")).then(res => {
            //console.log(institucion.replace("&","%26"))
            return res.json()
        }).then(data => {
            setDataC(data);
            console.log(dataC)
        })

    }, [institucion])


    return (
        <Container style={{ width: "100%" }}>
            <h2>Totales por institucion</h2>

            <form>
                <label> Institucion <input type="text" value={institucion} onChange={(event) => { setInstitucion(event.target.value) }} /> </label>

            </form>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> <b># </b></th>
                        <th> <b>Tipo </b></th>
                        <th> <b>Total ($) </b></th>
                    </tr>
                </thead>

                <tbody>

                    {dataD.map((cuenta, index) => (
                        <tr >
                            <td> {index + 1} </td>
                            <td> {cuenta.tipo} </td>
                            <td> {cuenta.total} </td>

                        </tr>
                    ))}

                    {dataC.map((cuenta, index) => (
                        <tr >
                            <td> {index + 2} </td>
                            <td> {cuenta.tipo} </td>
                            <td> {cuenta.total} </td>

                        </tr>
                    ))}
                </tbody>

            </Table>

        </Container >
    );
}
