import './App.css';
import { Cuentahabientes } from './components/Cuentahabientes'
import { InstitucionesBancarias } from './components/InstitucionesBancarias'
import { OperacionesCuentahabientes } from './components/OperacionesCuentahabiente'
import { TotalesPorInstitucion } from './components/TotalesPorInstitucion'
import { MovimientosPorCuentahabientes } from './components/MovimientosPorCuentahabiente'
import { IngresarTransaccion } from './components/IngresarTransaccion'
import { Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button,Table, Col, Row, Container, Form } from 'react-bootstrap'

function App() {

  const [user, setUser] = useState([])
  const [pass, setPass] = useState([])
  const [logeado, setLogeado] = useState([])
  useEffect(() => {

    setLogeado(localStorage.getItem("logeado"))
    console.log('x')



  }, [logeado])

  if (logeado == 'Si') {
    return (
      <div>

        <BrowserRouter>
          <Navbar bg="light" expand="lg">

            <Navbar.Brand href="#home">Bancos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="mr-auto">
                <Nav.Link href="cuentahabientes">Cuentahabientes</Nav.Link>
                <Nav.Link href="institucionesbancarias">Instituciones financieras</Nav.Link>
                <Nav.Link href="operacionescuentahabientes">Operaciones realizadas por cuentahabiente</Nav.Link>
                <Nav.Link href="totalesporinstitucion">Totales por institucion</Nav.Link>
                <Nav.Link href="movimientosporcuentahabientes">Movimientos por cuentahabiente</Nav.Link>
                <Nav.Link href="ingresartransaccion">Registrar transaccion</Nav.Link>


              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/cuentahabientes" component={Cuentahabientes} />
            <Route path="/institucionesbancarias" component={InstitucionesBancarias} />
            <Route path="/operacionescuentahabientes" component={OperacionesCuentahabientes} />
            <Route path="/totalesporinstitucion" component={TotalesPorInstitucion} />
            <Route path="/movimientosporcuentahabientes" component={MovimientosPorCuentahabientes} />
            <Route path="/ingresartransaccion" component={IngresarTransaccion} />
          </Switch>

        </BrowserRouter>



      </div>
    );
  } else {
    return (

      <Container style={{ width: "100%" }}>
        <h2>Iniciar Sesion</h2>


        <Form.Label> Usuario <Form.Control  type="text" value={user} onChange={(event) => { setUser(event.target.value) }} /> </Form.Label>
        <br />
        <Form.Label> Contraseña <Form.Control  type="password" value={pass} onChange={(event) => { setPass(event.target.value) }} /> </Form.Label>
        <br />

        <label> <Button  onClick={(event) => {
                if(user == 'Alvin' && pass == 'alvin'){
                  alert('Bienvenido')
                  setLogeado('Si')
                  localStorage.setItem('logeado','Si')
                }else{
                  alert('Datos incorrectos')
                }
            }} > Iniciar sesion </Button > </label>

      </Container>
    )
  }
}

export default App;
