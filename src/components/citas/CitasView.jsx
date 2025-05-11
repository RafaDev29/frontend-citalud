import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Tabla from '../../components/Tabla';
import API from '../../api/axios';
import CitaFormModal from './CitaFormModal';

export default function CitasView() {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const fetchCitas = async () => {
    try {
      const res = await API.get('/citas/');
      setCitas(res.data);
    } catch (error) {
      console.error('Error al obtener citas:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron obtener las citas',
        customClass: {
          confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        },
        buttonsStyling: false,
      });
    }
  };

  const fetchPacientes = async () => {
    try {
      const res = await API.get('/pacientes/');
      setPacientes(res.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron obtener los pacientes',
        customClass: {
          confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        },
        buttonsStyling: false,
      });
    }
  };

  useEffect(() => {
    fetchCitas();
    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar esta cita?',
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
        await API.delete(`/citas/${id}/`);
        fetchCitas();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'La cita ha sido eliminada correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      } catch (err) {
        const msg = err?.response?.data?.message || 'Error al eliminar la cita.';
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
    setCitaSeleccionada(null);
    setModalVisible(true);
  };

  const handleEdit = (cita) => {
    setCitaSeleccionada(cita);
    setModalVisible(true);
  };

  const handleSave = async (formData) => {
    try {
      if (citaSeleccionada) {
        await API.put(`/citas/${citaSeleccionada.id}/`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'La cita ha sido actualizada correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      } else {
        await API.post('/citas/', formData);
        Swal.fire({
          icon: 'success',
          title: 'Creada',
          text: 'La cita ha sido registrada correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      }
      setModalVisible(false);
      fetchCitas();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        'Error al guardar la cita.';
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

  const headers = ['ID', 'Paciente', 'Fecha', 'Motivo', 'Estado'];

  const rows = citas.map(c => ({
    id: c.id,
    paciente: typeof c.paciente === 'object' ? c.paciente.nombre : c.paciente,
    fecha: c.fecha_cita,
    motivo: c.motivo,
    estado: c.estado,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Citas médicas</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nueva cita
        </button>
      </div>

      <Tabla
        headers={headers}
        rows={rows}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <CitaFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        pacientes={pacientes}
        cita={citaSeleccionada}
      />
    </div>
  );
}
