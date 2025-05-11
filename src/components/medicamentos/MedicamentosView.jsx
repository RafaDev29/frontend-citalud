import { useEffect, useState } from 'react';
import Tabla from '../../components/Tabla';
import API from '../../api/axios';
import MedicamentoFormModal from './MedicamentoFormModal';

export default function MedicamentosView() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

  const fetchMedicamentos = async () => {
    try {
      const res = await API.get('/medicamentos/');
      setMedicamentos(res.data);
    } catch (error) {
      console.error('Error al obtener medicamentos:', error);
    }
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  // eslint-disable-next-line no-restricted-globals
  const handleDelete = async (id) => {
       // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Eliminar este medicamento?')) {
      try {
        await API.delete(`/medicamentos/${id}/`);
        fetchMedicamentos();
      } catch (err) {
        console.error('Error al eliminar medicamento:', err);
      }
    }
  };

  const handleCreate = () => {
    setMedicamentoSeleccionado(null);
    setModalVisible(true);
  };

  const handleEdit = (medicamento) => {
    setMedicamentoSeleccionado(medicamento);
    setModalVisible(true);
  };

  const handleSave = async (formData) => {
    try {
      if (medicamentoSeleccionado) {
        await API.put(`/medicamentos/${medicamentoSeleccionado.id}/`, formData);
      } else {
        await API.post('/medicamentos/', formData);
      }
      setModalVisible(false);
      fetchMedicamentos();
    } catch (err) {
      console.error('Error al guardar medicamento:', err);
    }
  };

  const headers = ['ID', 'Nombre', 'Descripción', 'Presentación', 'Laboratorio'];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Medicamentos</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nuevo medicamento
        </button>
      </div>

      <Tabla
        headers={headers}
        rows={medicamentos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <MedicamentoFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        medicamento={medicamentoSeleccionado}
      />
    </div>
  );
}
