import { Clientes } from '../../../lib/collections/clientes';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);



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