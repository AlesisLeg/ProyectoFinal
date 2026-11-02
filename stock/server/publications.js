import { Meteor } from 'meteor/meteor';
import { Productos } from '../lib/collections/productos';
import { Clientes } from '../lib/collections/clientes';
import { Ventas } from '../lib/collections/ventas';
import {Provedores} from '../lib/collections/provedores';


Meteor.publish('productos', function productosPublication()
{
	return Productos.find({owner: this.userId});
});

Meteor.publish('clientes', function clientesPublication()
{
	return Clientes.find({owner: this.userId});
});

Meteor.publish('ventas', function() {
    return Ventas.find(); // Publicar todas las ventas
  });
  

Meteor.publish('provedores', function provedoresPublication()
{
	return Provedores.find({owner: this.userId});
});



