import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PageHeader from '../../components/PageHeader';
import axios from 'axios'

import './RegistrarUsuario.css';
const url = 'http://127.0.0.1:5000'


class RegistrarUsuario extends Component {

	constructor(props) {
		super(props);
		this.state = {
			Nombre: '',
			FechaDeNacimiento: '0000-00-00',
			Sexo: '',
			Correo: '',
			Telefono: '',
			Password: '',
			Pago: ''
		}
	}


	registrarUsuario = () => {
		axios.post(`${url}/agregarCliente`, {
			nombre: this.state.Nombre,
			fecha_de_nacimiento: this.state.FechaDeNacimiento,
			sexo: this.state.Sexo,
			telefono: this.state.Telefono,
			correo: this.state.Correo,
			pw: this.state.Password,
			pago: this.state.Pago
		})
		.then((response) => {
			if(response.data == "Done"){
				this.props.history.goBack();
			}
		})
	}

	render(){
			return(
				<div>
					<PageHeader Description="Registrarse" />
					<div>
		     			<div className="ActualizarPaper">
			     			<Paper className="ActualizarPaperInterno">
			     				<Typography variant="h5" component="h3" color="primary">
										Ingrese su información
								</Typography>
								<div className="InnerPaperDivider">
										<Divider />
										<Divider />
								</div>
								<TextField
					                id="Nombre"
					                label="Nombre"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({ Nombre: input.target.value })}}
					                fullWidth
					                value={this.state.Nombre}
					                color="primary"
					            />
					             <TextField
					                id="FechaDeNacimiento"
					                label="Fecha de Nacimiento"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                type="date"
					                onChange={(input) => {this.setState({ FechaDeNacimiento: input.target.value })}}
					                fullWidth
					                value={this.state.FechaDeNacimiento}
					                color="primary"
					            />
					            <TextField
					                id="Sexo"
					                label="Sexo"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({Sexo: input.target.value })}}
					                fullWidth
					                value={this.state.Sexo}
					                color="primary"
					            />
					            <TextField
					                id="Correo"
					                label="Correo"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({Correo: input.target.value })}}
					                fullWidth
					                value={this.state.Correo}
					                color="primary"
					            />
					            <TextField
					                id="Telefono"
					                label="Telefono"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({Telefono: input.target.value })}}
					                fullWidth
					                value={this.state.Telefono}
					                color="primary"
					            />
					            <TextField
					                id="Password"
					                label="Password"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({Password: input.target.value })}}
					                fullWidth
					                value={this.state.Password}
					                color="primary"
					            />
					            <TextField
					                id="Pago"
					                label="Numero de Tarjeta"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({Pago: input.target.value })}}
					                fullWidth
					                value={this.state.Pago}
					                color="primary"
					            />
							    <div className="ActualizarBottones">
								    <Button variant="contained" color="primary" onClick={this.registrarUsuario}>
							              Registrarse
							            </Button>
							             <Button variant="contained" color="primary" onClick={() => {this.props.history.goBack()}}>
							              Cancelar
							            </Button>
						        </div>
		        			</Paper>
	        			</div>
	        		</div>
				</div>
			);
		}

}

export default withRouter(RegistrarUsuario);