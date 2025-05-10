import { useEffect, useState } from 'react';
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
    }
  };

  const fetchPacientes = async () => {
    try {
      const res = await API.get('/pacientes/');
      setPacientes(res.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  useEffect(() => {
    fetchCitas();
    fetchPacientes();
  }, []);

  // eslint-disable-next-line no-restricted-globals
  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Eliminar esta cita?')) {
      try {
        await API.delete(`/citas/${id}/`);
        fetchCitas();
      } catch (err) {
        console.error('Error al eliminar cita:', err);
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
      } else {
        await API.post('/citas/', formData);
      }
      setModalVisible(false);
      fetchCitas();
    } catch (err) {
      console.error('Error al guardar cita:', err);
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
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
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
