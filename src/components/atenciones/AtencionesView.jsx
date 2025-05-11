import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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
      Swal.fire('Error', 'No se pudieron obtener las atenciones', 'error');
    }
  };

  const fetchCitas = async () => {
    try {
      const res = await API.get('/citas/');
      setCitas(res.data);
    } catch (error) {
      console.error('Error al obtener citas:', error);
      Swal.fire('Error', 'No se pudieron obtener las citas', 'error');
    }
  };

  useEffect(() => {
    fetchAtenciones();
    fetchCitas();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la atención permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        cancelButton: 'bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2',
        popup: 'rounded-lg',
      },
      buttonsStyling: false, // ¡Importante! para que usen las clases personalizadas
    });
    

    if (result.isConfirmed) {
      try {
        await API.delete(`/atenciones/${id}/`);
        fetchAtenciones();
        Swal.fire('Eliminado', 'La atención fue eliminada correctamente.', 'success');
      } catch (err) {
        const msg = err?.response?.data?.message || 'Ocurrió un error al eliminar';
        Swal.fire('Error', msg, 'error');
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
        Swal.fire('Actualizado', 'La atención fue actualizada correctamente.', 'success');
      } else {
        await API.post('/atenciones/', formData);
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'La atención fue registrada correctamente.',
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
            popup: 'rounded-lg',
          },
          buttonsStyling: false,
        });
        
      }
      setModalVisible(false);
      fetchAtenciones();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        'Error al guardar atención.';
      Swal.fire('Error', msg, 'error');
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
