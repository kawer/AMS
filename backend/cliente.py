from flaskext.mysql import MySQL
import datetime
import time

def historialViajesCliente(idCliente, cursor):
	query = "SELECT p.nombre, v.Id_viaje, v.Origen, v.Destino, v.FechaYHora, v.Costo FROM Viaje v JOIN Taxi t ON v.Id_taxi = t.Id_taxi JOIN Persona p ON t.Id_taxista = p.id_persona  WHERE v.Id_cliente = " + idCliente + ";"
	cursor.execute(query);
	result = cursor.fetchone();
	if result == None:
		return '[]';
	resultString = '[';
	while result != None:
		resultString += '{ "nombre": "' + result[0] + '", "id_viaje": "' + str(result[1]) + '", "origen": "' + result[2] + '", "destino": "' + result[3] + '", "fecha": "' + str(result[4]) + '", "costo": "' + str(result[5]) +'"},'
		result = cursor.fetchone()
	resultString = resultString[:-1] + ']'
	return resultString

def viajeActualCliente(idCliente, cursor):
	query = "SELECT p.nombre, v.Id_viaje, v.Origen, v.Destino, v.FechaYHora, v.Costo, t.Marca, t.Modelo, t.Placas, t.Color FROM Viaje v JOIN Taxi t ON v.Id_taxi = t.Id_taxi JOIN Persona p ON t.Id_taxista = p.id_persona  WHERE v.Id_cliente = " + idCliente + " AND v.Estatus = 0;"
	cursor.execute(query);
	result = cursor.fetchone();
	if result == None:
		return 'none';
	if result != None:
		resultString = '{ "nombre": "' + result[0] + '", "id_viaje": "' + str(result[1]) + '", "origen": "' + result[2] + '", "destino": "' + result[3] + '", "fecha": "' + str(result[4]) + '", "costo": "' + str(result[5]) + '", "marca": "' + str(result[6]) + '", "modelo": "' + str(result[7]) + '", "placas": "' + str(result[8]) + '", "color": "' + str(result[9]) + '" }'
		return resultString