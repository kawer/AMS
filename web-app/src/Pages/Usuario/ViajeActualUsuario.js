import React, { Component } from 'react';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PageHeader from '../../components/PageHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import LeftNavUsuario from '../../components/LeftNavUsuario';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import './DetallesUsuario.css';
const url = 'http://127.0.0.1:5000'

class ViajeActualUsuario extends Component {

	constructor(props){
		super(props);
		this.state = {
			viajeActual: false,
			nombreTaxi: '',
			origen: '',
			destino: '',
			costo: -1,
			fecha: '2019-01-01',
			idViaje: -1
		}
	}
 
	componentDidMount() {
		axios.get(`${url}/actualCliente`, {
			params: {
				idCliente: this.props.ID
			}
		})
		.then((response) => {
			const resJson = response.data;
			if(resJson == 'none'){
				console.log("No hay viaje");
			}
			else {
				this.setState({
					nombreTaxi: resJson.nombre,
					origen: resJson.origen,
					destino: resJson.destino,
					costo: resJson.costo,
					fecha: resJson.fecha,
					idViaje: resJson.id_viaje,
					viajeActual: true
				})
			}
		})
	}

	crearViaje = () => {
		axios.post(`${url}/crearViaje`, {
			id: this.props.ID,
			origen: this.state.origen,
			destino: this.state.destino,
			fecha: this.state.fecha
		})
		.then((response) => {
			if(response.data == "Done"){
				this.props.history.goBack();
			}
		})
	}

	cancelarViaje = () => {
		axios.post(`${url}/cancelarViaje`, {
			idViaje: this.state.idViaje
		})
		.then((response) => {
			if(response.data == "Done"){
				this.props.history.goBack();
			}
		})
	}

	encuesta = () => {
		this.props.history.push('/encuesta');
	}



	renderViajeActual = () => {
		if(this.state.viajeActual == false) {
			return(
					<div className="PreMainPaper">
					<Paper className="InnerPaper">
						<Typography variant="h5" component="h3">
							No esta en un viaje
						</Typography>
						<div className="InnerPaperDivider">
										<Divider />
										<Divider />
						</div>
						<Typography variant="h5" component="h3">
							Crea Tu Viaje!
						</Typography>
						<TextField
			                id="Origen"
			                label="Origen"
			                className="TextFieldS"
			                margin="dense"
			                variant="outlined"
			                onChange={(input) => {this.setState({ origen: input.target.value })}}
			                fullWidth
			                value={this.state.origen}
			                color="primary"
			            />
			            <TextField
			                id="Destino"
			                label="Destino"
			                className="TextFieldS"
			                margin="dense"
			                variant="outlined"
			                onChange={(input) => {this.setState({ destino: input.target.value })}}
			                fullWidth
			                value={this.state.destino}
			                color="primary"
			            />
			            <TextField
			                id="Fecha"
			                label="Fecha"
			                className="TextFieldS"
			                margin="dense"
			                variant="outlined"
			                type="datetime-local"
			                onChange={(input) => {this.setState({ fecha: input.target.value })}}
			                fullWidth
			                value={this.state.fecha}
			                color="primary"
			            />
			            <Button variant="contained" color="primary" onClick={this.crearViaje} className="Login_Button">
			              		Crear Viaje
			            </Button>
					</Paper>
					</div>
				);
		}
		else {
			return(
				<div>
					<div className="PreMainPaper">
							<Paper>
								<div className="InnerPaperPadd">
									<Typography variant="h4" component="h3" color="primary">
										Información de su viaje
									</Typography>
									<div className="InnerPaperDivider">
										<Divider />
										<Divider />
									</div>
									<Typography variant="h5" component="h3">
										Nombre del Taxista: {this.state.nombreTaxi}
									</Typography>
									<Typography variant="h5" component="h3">
										Origen: {this.state.origen}
									</Typography>
									<Typography variant="h5" component="h3">
										Destino: {this.state.destino}
									</Typography>
									<Typography variant="h5" component="h3">
										Costo: $ {this.state.costo}
									</Typography>
									<Typography variant="h5" component="h3">
										Fecha: {this.state.fecha}
									</Typography>
								</div>
							</Paper>
						</div>
						<div className="ButtonsDetalles">
						<Button variant="contained" color="primary" onClick={this.encuesta} className="Login_Button">
			              		Encuesta
			            	</Button>
							<Button variant="contained" color="primary" onClick={this.cancelarViaje} className="Login_Button">
			              		Cancelar Viaje
			            	</Button>
							
		            	</div>
		           </div>
				);
		}

	}

	render() {
		return(
			<div>
				<PageHeader Description="Viaje Actual"/>
				<Grid container>
					<Grid item xs={1}>
						<LeftNavUsuario />
					</Grid>
					<Grid item xs={11}>
						{this.renderViajeActual()}
					</Grid>
				</Grid>
			</div>
			);
	}

}

const mapStateToProps = state => {
  return {
    loggedIn: state.userReducer.loggedIn,
    ID: state.userReducer.ID,
    correo: state.userReducer.correo,
    Nombre: state.userReducer.Nombre,
    FechaNacimiento: state.userReducer.FechaNacimiento,
    Sexo: state.userReducer.Sexo,
    Telefono: state.userReducer.Telefono
  };
};

const mapDispatchtoProps = dispatch => {
  return {
      tryLogIn: (ID, correo, Nombre, FechaNacimiento, Sexo, Telefono) => dispatch({type: 'LogIn', payload: {loggedIn: true, ID, correo, Nombre, FechaNacimiento, Sexo, Telefono}})
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(ViajeActualUsuario));