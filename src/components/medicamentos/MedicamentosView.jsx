import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron obtener los medicamentos.',
        customClass: {
          confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        },
        buttonsStyling: false,
      });
    }
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar este medicamento?',
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
        await API.delete(`/medicamentos/${id}/`);
        fetchMedicamentos();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El medicamento ha sido eliminado correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      } catch (err) {
        const msg = err?.response?.data?.message || 'Error al eliminar el medicamento.';
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
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'El medicamento fue actualizado correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      } else {
        await API.post('/medicamentos/', formData);
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'El medicamento fue registrado correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
      }
      setModalVisible(false);
      fetchMedicamentos();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        'Error al guardar medicamento.';
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
