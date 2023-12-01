import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'; //ESTA LIBRERIA CAMBIO, es diferente a la del video
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Clientes = new Mongo.Collection('clientes');

export const ClientesIndex = new EasySearch.Index({
	collection: Clientes,
	fields: ['name', 'summary'],
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 10}
})


Clientes.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: 'Nombre del Cliente',
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
		label: 'Detalle de Producto', 
		optional: true, 
		max: 2000, 
		autoform:{ 					//EL AUTOFORM SE DEFINE DIFERENTE AL VIDEO
			type: "textarea", 
			row: 10, 
			//class: "materialize-textarea"
			class: "textarea"
		}
	}﻿,
cantidad: {
	type: Number,
	optional: true,
},
}));

Clientes.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},
update: function(userId,doc) {
	return doc.owner === userId;
}
})

Meteor.methods({
	'clientes.remove'(clienteId){
		check(clienteId, String);
		Clientes.remove(clienteId);
	}
})

Meteor.methods({
	'clientes.update' (ClienteId){
		check(clienteId, String);

		Clientes.update (ClienteId, {
			$set: { cantidad : Number}
		});
	}
});