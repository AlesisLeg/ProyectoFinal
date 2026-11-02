import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Ventas } from '../lib/collections/ventas';

Meteor.methods({
    eliminarVenta(ventaId) {
      check(ventaId, String); // Validar que el ID sea un string
      Ventas.remove(ventaId); // Eliminar la venta usando el ID
    },
  });