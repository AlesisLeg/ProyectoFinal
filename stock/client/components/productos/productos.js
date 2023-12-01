import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import { Productos } from '../../../lib/collections/productos';
import './productos.html';


Template.productos.events({
	'click .remove': function(event, template){
		//console.log(this._id); //con esto muestro el id por consola que voy a eliminar
		Meteor.call('productos.remove',this._id);

	},
	'click #1 '(event,instance) {
		var prod = Productos.findOne({"_id":this._id});
		var cant = prod.cantidad;
		cant = cant+1;
		Productos.update({"_id":this._id},{$set:{cantidad:cant}})
	},
	'click #2 '(event,instance) {
		var prod = Productos.findOne({"_id":this._id});
		var cant = prod.cantidad;
		cant = cant-1;
		Productos.update({"_id":this._id},{$set:{cantidad:cant}})
	},
	'click .button '(event,instance) {
    event.preventDefault();
    event.stopPropagation();
 		console.log("evento de clase")
 		var prod = Productos.findOne({"_id":this._id});
		let id_act = this._id;
    let nombre=$("input#"+this._id ).val(); //tomo el valor del input nombre
		let detalle=$("input#"+this._id+"detalle").val(); //tomo el valor del input detalle
    console.log("Valor nombre",nombre);
		console.log("Valor detalle",detalle);
    console.log("id nombre",id_act);
		Productos.update({"_id":this._id},{$set:{name:nombre,detalle:detalle}}) //actualizo detalle y nombre
  },

});