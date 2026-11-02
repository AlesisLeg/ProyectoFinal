import {Mongo} from 'meteor/mongo';
import{ Ventas } from '../../../lib/collections/ventas'

Template.ventas.helpers({
    ventas() {
      return Ventas.find(); // Obtiene los documentos de ventas directamente desde la colección
    },
  });
  
  Template.ventas.onCreated(function() {
    this.subscribe('ventas');
  });
  
  Template.ventas.events({
    'click .eliminar-venta'(event) {
      const ventaId = event.currentTarget.getAttribute('data-id'); // Obtener el ID de la venta
  
      if (confirm('¿Estás seguro de que deseas eliminar esta venta?')) { // Confirmación antes de eliminar
        Meteor.call('eliminarVenta', ventaId, (error) => {
          if (error) {
            alert('Error al eliminar la venta: ' + error.reason);
          } else {
            alert('Venta eliminada correctamente');
          }
        });
      }
    },
  });
  