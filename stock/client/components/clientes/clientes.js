import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import { Clientes } from '../../../lib/collections/clientes';
import './clientes.html';


Template.clientes.events({
	'click .remove': function(event, template){
		//console.log(this._id); //con esto muestro el id por consola que voy a eliminar
		Meteor.call('clientes.remove',this._id);

	},
	'click #1 '(event,instance) {
		var clien = Clientes.findOne({"_id":this._id});
		var cant = clien.cantidad;
		cant = cant+1;
		Clientes.update({"_id":this._id},{$set:{cantidad:cant}})
	},
	'click #2 '(event,instance) {
		var clien = Clientes.findOne({"_id":this._id});
		var cant = clien.cantidad;
		cant = cant-1;
		Clientes.update({"_id":this._id},{$set:{cantidad:cant}})
	},
	'click .button '(event,instance) {
    event.preventDefault();
    event.stopPropagation();
 	console.log("evento de clase") 		
 	var clien = Clientes.findOne({"_id":this._id});		
 	let id_act1 = this._id;
    let nombre=$("input#"+this._id ).val(); //tomo el valor del input nombre
	let detalle=$("input#"+this._id+"detalle").val(); //tomo el valor del input detalle
    console.log("Valor nombre",nombre);
	console.log("Valor detalle",detalle);
    console.log("id nombre",id_act1);
	Clientes.update({"_id":this._id},{$set:{name:nombre,detalle:detalle}}) //actualizo detalle y nombre
  }
});