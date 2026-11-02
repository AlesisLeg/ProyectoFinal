import {Mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {Productos} from '../../../lib/collections/productos'
import { Clientes } from '../../../lib/collections/clientes'
import{ Ventas } from '../../../lib/collections/ventas'
/*///////////////////////////////////////////////////////////////////////
Se asignan los alumnos a los diferentes cursos creados, asi se pueden armar
los cursos de manera personalizada, el proceso no es autonomo debido a los
constantes cambios en los grupos de alumnos.
*/

Template.ventaForm.onRendered(function() {
  const instance = this;
  instance.autorun(() => {
    const dniInput = document.getElementById('clienteDNI');
    
    dniInput.addEventListener('input', function() {
      const dniValue = dniInput.value;
      const clientes = Clientes.find({ name: { $regex: dniValue, $options: 'i' }}).fetch(); // Asegúrate de que 'name' sea el campo correcto para DNI

      const sugerenciasDropdown = document.getElementById('sugerencias');
      sugerenciasDropdown.innerHTML = ''; // Limpiar sugerencias anteriores
      if (clientes.length > 0) {
        sugerenciasDropdown.style.display = 'block';
        clientes.forEach(cliente => {
          const li = document.createElement('li');
          li.textContent = cliente.name; // Cambia 'name' si es necesario
          li.dataset.detalle = cliente.detalle; // Guarda el nombre completo en un atributo
          li.addEventListener('click', function() {
            dniInput.value = cliente.name; // Rellena el DNI
            document.getElementById('detalleCliente').value = cliente.detalle; // Rellena el nombre
            sugerenciasDropdown.style.display = 'none'; // Oculta las sugerencias
          });
          sugerenciasDropdown.appendChild(li);
        });
      } else {
        sugerenciasDropdown.style.display = 'none'; // Oculta si no hay sugerencias
      }
    });
  });
});

Template.ventaForm.helpers({
  productos() {
    return Productos.find({}); // Devuelve todos los productos
  }
});

Template.ventaForm.events({
  'click .producto-item': function(event) {
    const productoNombre = $(event.currentTarget).data('producto');
    document.getElementById('producto').value = productoNombre;
    $('#productoResultados').hide(); // Oculta los resultados
  },
  'input #producto': function() {
    const value = $('#producto').val();
    // Aquí puedes filtrar y mostrar solo los productos que coincidan
  }
});

Template.ventaForm.onCreated(function() {
  // Inicializa la sesión para la búsqueda
  Session.set('producto', '');
});

Template.ventaForm.helpers({
  productos() {
    const busqueda = Session.get('producto').toLowerCase(); // Obtiene el término de búsqueda
    return Productos.find({
      name: { $regex: busqueda, $options: 'i' } // Filtra productos por nombre usando regex
    }).fetch();
  }
});

Template.ventaForm.events({
  'input #producto': function(event) {
    const busqueda = event.target.value; // Obtiene el valor actual del input
    Session.set('producto', busqueda); // Actualiza la sesión con el nuevo valor
  }
});

Template.ventaForm.events({  
  'submit #AsignVentas': function (event, template) {
    event.preventDefault();

    // Captura los valores de los campos del formulario
    const clienteDNI = template.find('#clienteDNI').value; // Cambia '#dni' por el ID correcto de tu campo de entrada
    const detalleCliente = template.find('#detalleCliente').value; // Cambia '#nombreCliente' por el ID correcto de tu campo
    const producto = template.find('#producto').value; // Cambia '#producto' por el ID correcto de tu campo de producto
    const cantidad = parseInt(template.find('#cantidad').value);
    const fecha = new Date(event.target.fecha.value);

    // Verificación simple de los campos (opcional)
    if (!clienteDNI || !detalleCliente || !producto || !cantidad || isNaN(cantidad)) {
      alert("Todos los campos son obligatorios y la cantidad debe ser un número.");
      return;
    }
    console.log(clienteDNI, detalleCliente, producto, cantidad);
    // Inserta los datos en la colección Ventas
    Ventas.insert({
      clienteDNI,
      detalleCliente,
      producto,
      cantidad,
      fecha
    }, (error) => {
      if (error) {
        console.error("Error al insertar la venta:", error);
      } else {
        alert("Venta registrada exitosamente.");
        // Opcional: Limpia los campos del formulario después de la inserción
        event.target.reset();
      }
    });
  }
});




