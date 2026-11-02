import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import{ check } from 'meteor/check';
import{ Meteor } from 'meteor/meteor';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Provedores = new Mongo.Collection('provedores');
Provedores.attachSchema(new SimpleSchema({
 name: {
  type: String,
  label: 'Nombre',
  min:2,
  max: 200,
  optional: true,
 },
 surname: {
  type: String,
  label: 'Apellido',
  min:2,
  max: 200,
  optional: true,
 },
 dni: {           //restringir dni con mascara obligatorio desde el formulario
  type: String,
  label: 'DNI',
  optional: false,
 },
 address: {
  type: String,
  label: 'Dirección',
  min:4,
  max: 200,
  optional: false,
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
tutores: {            //relación uno a muchos con la collección tutores
   type: Array,
   optional: false,
  },
  'tutores.$': String,

id_notas: {            //notas correspondiente al alumno
   type: Array,
    optional: true,     //desactivar
  },
    'id_notas.$': String,

id_observacion: {            //notas correspondiente al alumno
    type: Array,
    optional: true,     //desactivar
     },
       'id_observacion.$': String,
}));



Provedores.allow({
  insert: function(userId, doc){
    return doc.owner===userId;
  }
})
Provedores.allow({
  update: function(userId, doc){
    return doc.owner===userId;
  }
})

Meteor.methods({
  'id_notas.update'(data){
    check(data.idProvedores,String);
    check(data.id_nota,String);
    Provedor.update({_id:data.idProvedores}, {$push:{
      "id_notas":data.id_nota,
    }

  });
return;
  }
})

Meteor.methods({
  'provedores.remove'(provedoresId){
    check(provedoresId, String );
    Provedores.remove(provedoresId);
  }
})
Meteor.methods({
  'id_observacion.update'(data){
    check(data.idProvedores,String);
    check(data.id_nota,String);
    Provedores.update({_id:data.idProvedores}, {$push:{
      "id_notas":data.id_nota,
    }

  });
return;
  }
})