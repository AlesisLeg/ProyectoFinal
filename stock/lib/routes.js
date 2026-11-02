import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { Productos, ProductosIndex } from '../lib/collections/productos';
import { Clientes, ClientesIndex } from '../lib/collections/clientes';
import { Provedores } from './collections/provedores';
import { Ventas, VentasIndex } from './collections/ventas';

Router.onBeforeAction(function () {  

  if (!Meteor.userId()) {    
    Router.go('home');    
  } else {
    if(Router.current().route.getName() === 'home'){
       Router.go('productos');       
    }        
  }
  this.next();
  
});

Router.configure({
	layoutTemplate: 'baseLayout',
	waitOn:function() { 
		return [
			function() {return Meteor.subscribe('productos'); },
			function() { return Meteor.subscribe('clientes'); }, 
			function() { return Meteor.subscribe('provedores'); },
			function() { return Meteor.subscribe('ventas'); },
		];
		  
	}	
});


Router.route('/', {
  name: 'home'
});


//-------------------------------SECCION PRODUCTOS----------------------------------

Router.route('/productos',{
	name: 'productos',
	data: {
		productos(){
			return ProductosIndex;   //retorana los productos index. es lo que van ayudar a buscar
		}
	}
})


Router.route('/producto_form', {
	name: 'producto_form'
})

Router.route('/producto/:_id', function(){
	let producto = Productos.findOne({_id: this.params._id});
	if (!producto){
		Router.go('productos');
	}
})



Router.route('Listas', {
	name: 'Listas'
})

//-------------------------------SECCION PERFILES----------------------------------

Router.route('/profile', {
	name:  'profile',  //en la template profiles
	data: {
		user() {
			if (Meteor.user())
			{
				return {
					id: Meteor.user()._id,
					email: Meteor.user().emails[0].address
				}
			}
		}
	}
});

//-------------------------------SECCION CLIENTES----------------------------------


//-------------------------------SECCION CLIENTES----------------------------------
Router.route('/clientes',{
	name: 'clientes',
	data: {
		clientes(){
			return ClientesIndex;
		}
	}
})


Router.route('/cliente_form', {
	name: 'cliente_form'
})

Router.route('/cliente/:_id', function(){
	let cliente = Clientes.findOne({_id: this.params._id});
	if (!cliente){
		Router.go('clientes');
	}
}, )

//-------------------------------SECCION VENTAS----------------------------------


//-------------------------------SECCION VENTAS----------------------------------
Router.route('/provedores',{
	name: 'provedores',
	data: {
		provedores(){
			return provedores;
		}
	}
})


Router.route('/provedor_form', {
	name: 'provedor_form'
})

Router.route('/provedores/:_id', function(){
	let provedores = Provedores.findOne({_id: this.params._id});
	if (!provedores){
		Router.go('provedores');
	}
})

//-----------------------------------VENTAS--------------------------------------------

Router.route('/ventas',{
	name: 'ventas',
	data: {
		ventas(){
			return VentasIndex;
		}
	}
})
  

Router.route('/venta_form', {
	name: 'venta_form'
})


Router.route('/ventas/:_id', function(){
	let ventas = Ventas.findOne({_id: this.params._id});
	if (!ventas){
		Router.go('ventas');
	}
})
