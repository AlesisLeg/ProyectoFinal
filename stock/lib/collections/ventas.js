// lib/collections/ventas.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'; // Asegúrate de tener SimpleSchema instalado
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Ventas = new Mongo.Collection('ventas');

export const VentasIndex = new EasySearch.Index({
	collection: Ventas,
	fields: ['clienteDNI'], //campos donde se quiere realizar la busqueda
	engine: new EasySearch.Minimongo(),  //el motor
	defaultSearchOptions: {limit: 10}		//recibe un objeto y tiene un limite de 10 para la paginacion
})


Ventas.schema = new SimpleSchema({
  clienteDNI: {
    type: String,
    label: 'DNI del Cliente',
    max: 30
  },
  detalleCliente: {
    type: String,
    label: 'Nombre del Cliente',
    max: 50
  },
  producto: {
    type: String,
    label: 'Nombre del Producto',
    max: 50
  },
  cantidad: {
    type: Number,
    label: 'Cantidad',
    min: 1
  },
  fecha: {
    type: Date,
    label: 'Fecha de la Venta',
    autoValue() {
      return new Date();
    }
  }
});

// Adjuntar el esquema a la colección
Ventas.attachSchema(Ventas.schema);


// Permisos
Ventas.allow({
    insert(userId, doc) {
        return !!userId; // Permitir la inserción solo si el usuario está logueado
    },
    update(userId, doc) {
        return doc.owner === userId; // Permitir la actualización solo si el usuario es el propietario
    },
    remove(userId, doc) {
      return !!userId; // Permitir eliminación solo si el usuario está autenticado
    },
});




Meteor.methods({
  'ventas.insert'(datosVenta) {
      check(datosVenta, {
          clienteDNI,
          detalleCliente,
          fecha,
          producto,
          cantidad
      });

      if (!this.userId) {
          throw new Meteor.Error('not-authorized'); // Lanza un error si el usuario no está autenticado
      }

      // Inserta la venta
      Ventas.insert({
          ...datosVenta,
          owner: this.userId,
          createdAt: new Date()
      });
  }
});