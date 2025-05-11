import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Tabla from '../../components/Tabla';
import API from '../../api/axios';
import ServicioFormModal from './ServicioFormModal';

export default function ServiciosView() {
  const [servicios, setServicios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const fetchServicios = async () => {
    try {
      const res = await API.get('/servicios/');
      setServicios(res.data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron obtener los servicios.',
        customClass: {
          confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        },
        buttonsStyling: false,
      });
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar este servicio?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        cancelButton: 'bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2',
        popup: 'rounded-lg',
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/servicios/${id}/`);
        fetchServicios();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El servicio fue eliminado correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      } catch (err) {
        const msg = err?.response?.data?.message || 'Error al eliminar el servicio.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: msg,
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      }
    }
  };

  const handleCreate = () => {
    setServicioSeleccionado(null);
    setModalVisible(true);
  };

  const handleEdit = (servicio) => {
    setServicioSeleccionado(servicio);
    setModalVisible(true);
  };

  const handleSave = async (formData) => {
    try {
      if (servicioSeleccionado) {
        await API.put(`/servicios/${servicioSeleccionado.id}/`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'El servicio fue actualizado correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      } else {
        await API.post('/servicios/', formData);
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'El servicio fue registrado correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      }
      setModalVisible(false);
      fetchServicios();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        'Error al guardar servicio.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
        customClass: {
          confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        },
        buttonsStyling: false,
      });
    }
  };

  const headers = ['ID', 'Nombre', 'Tipo', 'Descripción', 'Precio'];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Servicios Médicos</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nuevo servicio
        </button>
      </div>

      <Tabla
        headers={headers}
        rows={servicios}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <ServicioFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        servicio={servicioSeleccionado}
      />
    </div>
  );
}
