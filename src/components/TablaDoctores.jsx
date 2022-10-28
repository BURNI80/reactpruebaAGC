import axios from 'axios'
import React, { Component } from 'react'
import Global from '../global/Global'

export default class TablaDoctores extends Component {

  state = {
    doctores: [],
    statusDoctores: true,
  }

  componentDidMount = () => {
    this.crearTabla()
  }

  crearTabla = () => {
    const request = "/api/Doctores/DoctoresEspecialidad/"

    axios.get(Global.url + request + this.props.especialidad).then(res => {
      var datos = res.data
      this.setState({
        doctores: datos,
        statusDoctores: true,
      })
    })
  }


  render() {


    return (
      <div>
        {
          (this.state.statusDoctores === true) &&
          (
            <table border="1">
              <thead>
                <tr>
                  <th>Apellido</th>
                  <th>Especialidad</th>
                  <th>Salario</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.doctores.map((doctor, index) => {
                    return (
                      <tr key={doctor.idDoctor}>
                        <td>{doctor.apellido}</td>
                        <td>{doctor.especialidad}</td>
                        <td>{doctor.salario}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
        }

      </div>
    )
  }
}
