import { useEffect, useState } from 'react';
import Tabla from '../components/pacientes/Tabla';
import API from '../api/axios';
import PacienteFormModal from '../components/pacientes/PacienteFormModal';

export default function Pacientes() {
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
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  // eslint-disable-next-line no-restricted-globals
  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      try {
        await API.delete(`/pacientes/${id}/`);
        fetchPacientes();
      } catch (err) {
        console.error('Error al eliminar:', err);
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
      } else {
        await API.post('/pacientes/', formData);
      }
      setModalVisible(false);
      fetchPacientes();
    } catch (err) {
      console.error('Error al guardar paciente:', err);
    }
  };

  const headers = ['ID', 'Nombre', 'DNI', 'Fecha', 'Teléfono', 'Dirección', 'Email'];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Pacientes</h1>
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
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
