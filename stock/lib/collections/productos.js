import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'; //ESTA LIBRERIA CAMBIO, es diferente a la del video
import { check } from 'meteor/check';  //comprueba si puede eliminar un producto
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Productos = new Mongo.Collection('productos');

export const ProductosIndex = new EasySearch.Index({
	collection: Productos,
	fields: ['name'], //campos donde se quiere realizar la busqueda
	engine: new EasySearch.Minimongo(),  //el motor
	defaultSearchOptions: {limit: 10}		//recibe un objeto y tiene un limite de 10 para la paginacion
})


Productos.attachSchema(new SimpleSchema({

	name: {
		type: String,
		label: 'Nombre del producto',
		max: 200
	},
	owner:{
		type: String,
		label: "Propietario",
		autoValue() {
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	created: {
		type: Date,
		autoValue() {
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	},
	detalle:{ 
		type: String, 
		label: 'Detalle del Producto', 
		optional: true, 
		max: 2000,
		autoform:{ 					//EL AUTOFORM SE DEFINE DIFERENTE AL VIDEO
			type: "textarea", 
			row: 10, 
			//class: "materialize-textarea"
			class: "textarea"
		}
	},
	
	cantidad: {        
    type: Number,		//EL ARRAY TAMBIEN SE DEFINE DIFERENTE AL VIDEO
    optional: true,    
  	},
}));

Productos.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},
		update: function(userId,doc) {
			return doc.owner === userId;
		}

})

Meteor.methods({
	'productos.remove'(productoId){       //cuando se quiera eliminar un producto, le pasa el productoId
		check(productoId, String);		// si no es de tipo String no lo puede eliminar
		Productos.remove(productoId);
	}
});
   