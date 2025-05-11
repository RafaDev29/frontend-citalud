import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Tabla from '../Tabla';
import API from '../../api/axios';
import PacienteFormModal from './PacienteFormModal';

export default function PacientesView() {
  const [pacientes, setPacientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  const fetchPacientes = async () => {
    try {
      const res = await API.get('/pacientes/');
      const formateados = res.data.map(p => ({
        id: p.id,
        nombre: p.nombre,
        dni: p.dni,
        fecha: p.fecha_nacimiento,
        telefono: p.telefono,
        direccion: p.direccion,
        email: p.email,
      }));
      setPacientes(formateados);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron obtener los pacientes.',
        customClass: {
          confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        },
        buttonsStyling: false,
      });
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar este paciente?',
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
        await API.delete(`/pacientes/${id}/`);
        fetchPacientes();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El paciente ha sido eliminado correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      } catch (err) {
        const msg = err?.response?.data?.message || 'Error al eliminar paciente.';
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

  const handleEdit = (paciente) => {
    setPacienteSeleccionado(paciente);
    setModalVisible(true);
  };

  const handleCreate = () => {
    setPacienteSeleccionado(null);
    setModalVisible(true);
  };

  const handleSave = async (formData) => {
    try {
      if (pacienteSeleccionado) {
        await API.put(`/pacientes/${pacienteSeleccionado.id}/`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'El paciente fue actualizado correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      } else {
        await API.post('/pacientes/', formData);
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'El paciente fue registrado correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      }
      setModalVisible(false);
      fetchPacientes();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        'Error al guardar paciente.';
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

  const headers = ['ID', 'Nombre', 'DNI', 'Fecha', 'Teléfono', 'Dirección', 'Email'];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Pacientes</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nuevo paciente
        </button>
      </div>

      <Tabla
        headers={headers}
        rows={pacientes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PacienteFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        paciente={pacienteSeleccionado}
      />
    </div>
  );
}
