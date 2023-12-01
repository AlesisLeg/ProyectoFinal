import { Productos } from '../../../lib/collections/productos';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);


Template.productoForm.helpers({
	formCollection() {
		return Productos;
	}
})

Template.productoForm.onCreated(function()
{
	AutoForm.addHooks(['productoForm'],{
		onSuccess: function(operation, result, template)
		{
			Router.go('/productos');
		}
	});
})