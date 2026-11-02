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
	fields: ['name'],
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 10}
})


Clientes.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: 'DNI',
		max: 30
	},

	detalle:{ 
		type: String, 
		label: 'Nombre y apellido', 
		optional: true, 
		max: 30, 
		autoform:{ 					//EL AUTOFORM SE DEFINE DIFERENTE AL VIDEO
			type: "textarea", 
			row: 10, 
			//class: "materialize-textarea"
			class: "textarea"
		}
	},

direccion: {
	type: String,
	label: 'Direccion',
	optional: true,
	max: 30,
	autoform:{ 					//EL AUTOFORM SE DEFINE DIFERENTE AL VIDEO
			type: "textarea", 
			row: 10, 
			//class: "materialize-textarea"
			class: "textarea"
		}
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
});