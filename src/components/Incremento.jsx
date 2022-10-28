import axios from 'axios'
import React, { Component } from 'react'
import Global from '../global/Global'
import TablaDoctores from './TablaDoctores'
export default class Incremento extends Component {

    incremento = React.createRef()
    especialidadSel = React.createRef()

    state = {
        especialidades: [],
        statusEspecialidades: false,
        statusPut:false,
        doctores:[],
        statusDoctores:false,
        especialidad:"",
    }

    componentDidMount = () => {
        this.getEspecialidades()
    }

    getEspecialidades = () => {
        const request = "/api/Doctores/Especialidades"

        axios.get(Global.url + request).then(res => {
            const especialidades = res.data

            this.setState({
                especialidades: especialidades,
                statusEspecialidades: true,
            })
        })
    }

    incrementar = (e) => {
        e.preventDefault()
        const request = "/api/Doctores/"
        var especialidadSel = this.especialidadSel.current.value
        var incremento = this.incremento.current.value
        this.setState({
            especialidad:especialidadSel,
            statusPut:false,

        })        

        axios.put(Global.url+request+especialidadSel+"/"+incremento).then(res => {

            this.setState({
                statusPut:true,
            })
        })
    }


    render() {
        return (
            <div>
                {
                    (this.state.statusEspecialidades === true) &&
                    (
                        <div>
                            <form onSubmit={this.incrementar}>
                                <label>SELECIONE UNA ESPECIALIDAD: </label>
                                <select ref={this.especialidadSel} >
                                    {
                                        this.state.especialidades.map((esp,index) => {
                                            return(<option key={index} >{esp}</option>)
                                        })
                                    }
                                </select><br/>
                                <label>INCREMNTO SALARIAL :</label>
                                <input type="text" ref={this.incremento} />
                                <button>Incrementar</button>
                            </form>
                            <hr />
                            {
                                (this.state.statusPut === true)&&
                                (<TablaDoctores  especialidad={this.state.especialidad} />)
                            }
                        </div>
                    )
                }

            </div>
        )
    }
}
