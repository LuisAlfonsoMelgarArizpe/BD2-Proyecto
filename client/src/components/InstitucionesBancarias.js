import React from 'react';
import { Col, Row, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';


export const InstitucionesBancarias = () => {



  const [data, setData] = useState([])


  useEffect(() => {
    fetch('http://192.168.191.129:3000/institucionesBancarias').then(res => {
      return res.json()
    }).then(data => {
      setData(data);
      console.log(data)
    })

  }, [])


  return (
    <Container>
      <h2>Instituciones Bancarias</h2>


      <Row>
        <Col> <b>Nombre</b></Col>
        <Col><b>Abreviatura</b></Col>
        
      </Row>


      {data.map((cuenta, index) => (
        <Row>
          
          <Col sm>{cuenta.nombre}</Col>
          <Col sm>{cuenta.abreviatura}</Col>
          
        </Row>
      ))}

    </Container>
  );
}
