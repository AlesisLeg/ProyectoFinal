import  {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {Provedor} from '../../../lib/collections/provedores'
//import { Tutor } from '../../../lib/collections/tutor'
//let form=Session.get("formulario");
//console.log(form);
//tengo que agregar el control por roles
Template.provedorForm.events({
  "submit #crearProvedor": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
     
     //let tut=Session.get("tutor");
     var newProvedor= new Object();     //creo un objeto para almacenar los valores del formulario
     newProvedor.name=target.name.value.toUpperCase();     //se alamcena el contenido del input en una objeto
     newProvedor.surname=target.surname.value.toUpperCase();
     newProvedor.dni=target.dni.value;
     newProvedor.address=target.address.value;
     newProvedor.fech_nac=target.fech_nac.value;
     newProvedor.legajo=target.legajo.value;
     newProvedor.grupo_sang=target.grupo_sang.value;
     newProvedor.esc_origen=target.esc_origen.value;
     let dni_tutor=target.dni_tutor.value;
     if (dni_tutor.length == 0){
      //let tut=Session.get("tutor");
      //Session.set("tutor",1);
      //Session.set("newAlumno",newAlumno);
      alert("No se encuentra el tutor, desea crearlo?");
      Router.go('tutor_form');
     }
     else{
      tutor=Tutor.findOne({"dni":dni_tutor});
      //console.log(tutor._id);
      newProvedor.tutores=tutor._id;
      //console.log(tutor);
      console.log(newProvedor);
     }
     /*if(tut===2){
      var data_alumno=Session.get("newAlumno");
      $('#name').val(var_data.name).text();
      $('#surname').val(var_data.surname).text();
      $('#dni').val(var_data.dni).text();
      $('#dni_tutor').val(var_data.dni_tutor).text();
      Session.set("tutor",0);
     }*/
 
     let cuenta=Provedor.find({"dni":newProvedor.dni}).count();
     
     let loggedInUser=Meteor.user();
     
     if (Roles.userIsInRole(loggedInUser, ['admin','vice_director','secretario'])){
     if(cuenta===0){    //veo si el dni ya existe
     ////////////////////////////////////
  Provedor.insert({
    name:newProvedor.name,     //se alamcena el contenido del input en una variable
    surname:newProvedor.surname,
    dni:newProvedor.dni,
    address:newProvedor.address,
    fech_nac:newProvedor.fech_nac,
    legajo:newProvedor.legajo,
    grupo_sang:newProvedor.grupo_sang,
    esc_origen:newProvedor.esc_origen,
    tutores:newProvedor.tutores,
})

if (form==1){
  Session.set("formulario",0);
  Session.set("dni",newProvedor.dni);
  alert("Alumno Ingresado con Exito!");
  Router.go('AsignAlmCurso');
}
else{
  alert("Alumno Ingresado con Exito!");
  $('#crearProvedor')[0].reset();
Router.go('provedorForm');
  }
} //fin del if de cuenta
else{
  if (form==1){
    Session.set("formulario",0);
    Session.set("dni",newProvedor.dni);
    alert("El Alumno ya existe!");
    Router.go('AsignAlmCurso');
  }
  else{
    alert("El Alumno ya existe!");
  Router.go('provedorForm');

  }
}
}//fin del control de roles
else{
  alert("No esta autorizado a inscribir alumnos");
  Router.go('profil');
}//else del error de permisos
},//fin de la funcion del event
});
//////////////////////////////////
Template.provedorForm.rendered = function() {
  Meteor.typeahead.inject();
};
Template.provedorForm.helpers({
  tutor: function() {
    return Tutor.find().fetch().map(
      function(it) {
        console.log(it.dni);
        return it.dni;
      });
  }
});