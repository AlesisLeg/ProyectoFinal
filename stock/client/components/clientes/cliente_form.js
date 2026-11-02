import { Clientes } from '../../../lib/collections/clientes';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);
import './clientes.html';


Template.clientes.events({
	'click .remove': function(event, template){
		//console.log(this._id); //con esto muestro el id por consola que voy a eliminar
		Meteor.call('clientes.remove',this._id);

	},
	
	'click .button '(event,instance) {
    event.preventDefault();
    event.stopPropagation();
 	console.log("evento de clase") 		
 	var clientes = Clientes.findOne({"_id":this._id});		
    let name=$("input#"+this._id+"name" ).val(); //tomo el valor del input nombre
	let detalle=$("input#"+this._id+"detalle").val(); //tomo el valor del input detalle
	let direccion=$("input#"+this._id+"direccion").val();
    console.log("Valor nombre",name);
	console.log("Valor detalle",detalle);
	console.log("Valor domicilio",direccion);
	Clientes.update({"_id":this._id},{$set:{name:dni,detalle:detalle,direccion:direccion}}) //actualizo detalle y nombre
  },
});



Template.clienteForm.helpers({
	formCollection() {
		return Clientes;
	}
})

Template.clienteForm.onCreated(function()
{
	AutoForm.addHooks(['clienteForm'],{
		onSuccess: function(operation, result, template)
		{
			Router.go('/clientes');
		}
	});

})
