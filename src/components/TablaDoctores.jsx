import React, { Component } from 'react'

export default class TablaDoctores extends Component {

  // componentDidUpdate = (oldProps) => {
  //   if(oldProps.doctores !== this.props.doctores){
  //     this.crearTabla()
  //   }
  // }

  // componentDidMount = () => {
  //   this.crearTabla()
  // }

  // crearTabla = () => {
  //   var doctores = this.props.doctores
  //   console.log(doctores);
  // }


  render() {


    return (
      <div>
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
              this.props.doctores.map((doctor, index) => {
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
      </div>
    )
  }
}
