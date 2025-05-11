import { useEffect, useState } from 'react';
import Tabla from '../../components/Tabla';
import API from '../../api/axios';
import AtencionFormModal from './AtencionFormModal';

export default function AtencionesView() {
  const [atenciones, setAtenciones] = useState([]);
  const [citas, setCitas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [atencionSeleccionada, setAtencionSeleccionada] = useState(null);

  const fetchAtenciones = async () => {
    try {
      const res = await API.get('/atenciones/');
      setAtenciones(res.data);
    } catch (error) {
      console.error('Error al obtener atenciones:', error);
    }
  };

  const fetchCitas = async () => {
    try {
      const res = await API.get('/citas/');
      setCitas(res.data);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  };

  useEffect(() => {
    fetchAtenciones();
    fetchCitas();
  }, []);

  // eslint-disable-next-line no-restricted-globals
  const handleDelete = async (id) => {
       // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Eliminar esta atención?')) {
      try {
        await API.delete(`/atenciones/${id}/`);
        fetchAtenciones();
      } catch (err) {
        console.error('Error al eliminar atención:', err);
      }
    }
  };

  const handleCreate = () => {
    setAtencionSeleccionada(null);
    setModalVisible(true);
  };

  const handleEdit = (atencion) => {
    setAtencionSeleccionada(atencion);
    setModalVisible(true);
  };

  const handleSave = async (formData) => {
    try {
      if (atencionSeleccionada) {
        await API.put(`/atenciones/${atencionSeleccionada.id}/`, formData);
      } else {
        await API.post('/atenciones/', formData);
      }
      setModalVisible(false);
      fetchAtenciones();
    } catch (err) {
      console.error('Error al guardar atención:', err);
    }
  };

  const headers = ['ID', 'Cita', 'Diagnóstico', 'Recomendaciones'];

  const rows = atenciones.map((a) => ({
    id: a.id,
    cita: typeof a.cita === 'object' ? `#${a.cita.id}` : a.cita,
    diagnostico: a.diagnostico,
    recomendaciones: a.recomendaciones,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Atenciones Médicas</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nueva atención
        </button>
      </div>

      <Tabla
        headers={headers}
        rows={rows}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <AtencionFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        citas={citas}
        atencion={atencionSeleccionada}
      />
    </div>
  );
}
