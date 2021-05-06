import React from 'react';
import { Col, Row, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';


export const Cuentahabientes = () => {



  const [data, setData] = useState([])


  useEffect(() => {
    fetch('http://192.168.191.129:3000/cuentahabientes').then(res => {
      return res.json()
    }).then(data => {
      setData(data);
      console.log(data)
    })

  }, [])


  return (
    <Container>
      <h2>Cuentahabientes</h2>


      <Row>
        <Col><b>CUI</b></Col>
        <Col><b>Nombre</b></Col>
        <Col><b>Apellido</b></Col>
        <Col><b>Email</b></Col>
        <Col><b>Fecha registro</b></Col>
        <Col><b>Genero</b></Col>
        <Col><b>Institucion Bancaria</b></Col>
        <Col><b>Saldo Inicial</b></Col>
        <Col><b>Tipo Cuenta</b></Col>
      </Row>


      {data.map((cuenta, index) => (
        <Row>
          <Col sm>{cuenta.cui}</Col>
          <Col sm>{cuenta.nombre}</Col>
          <Col sm>{cuenta.apellido}</Col>
          <Col sm>{cuenta.email}</Col>
          <Col sm>{cuenta.fecharegistro}</Col>
          <Col sm> {cuenta.genero}</Col>
          <Col sm> {cuenta.institucionbancaria}</Col>
          <Col sm> {cuenta.saldoinicial}</Col>
          <Col sm> {cuenta.tipocuenta}</Col>
        </Row>
      ))}

    </Container>
  );
}
