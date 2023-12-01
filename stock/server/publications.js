import { Meteor } from 'meteor/meteor';
import { Productos } from '../lib/collections/productos';
import { Clientes } from '../lib/collections/clientes';


Meteor.publish('productos', function productosPublication()
{
	return Productos.find({owner: this.userId});
});

Meteor.publish('clientes', function clientesPublication()
{
	return Clientes.find({owner: this.userId});
});
