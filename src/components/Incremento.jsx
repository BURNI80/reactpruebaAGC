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
        this.setState({
            doctores:[],
            statusDoctores:false,
        })
        const request = "/api/Doctores/"
        var especialidadSel = this.especialidadSel.current.value
        var incremento = this.incremento.current.value

        axios.put(Global.url+request+especialidadSel+"/"+incremento).then(res => {

            this.setState({
                statusPut:true,
            })

            axios.get(Global.url+request).then(res => {
                var doctores = res.data

                for(var i = 0;i<doctores.length;i++){
                    if(doctores[i].especialidad === especialidadSel){
                        this.state.doctores.push(doctores[i])
                    }
                }


                this.setState({
                    doctores:this.state.doctores,
                    statusDoctores:true,
                })
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
                                (this.state.statusDoctores === true)&&
                                (<TablaDoctores  doctores={this.state.doctores} />)
                            }
                        </div>
                    )
                }

            </div>
        )
    }
}
