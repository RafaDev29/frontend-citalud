import { useState, useEffect } from 'react';

function MedicamentoFormModal({ visible, onClose, onSave, medicamento }) {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    presentacion: '',
    laboratorio: '',
  });

  useEffect(() => {
    if (medicamento) {
      setForm({
        nombre: medicamento.nombre,
        descripcion: medicamento.descripcion,
        presentacion: medicamento.presentacion,
        laboratorio: medicamento.laboratorio,
      });
    } else {
      setForm({
        nombre: '',
        descripcion: '',
        presentacion: '',
        laboratorio: '',
      });
    }
  }, [medicamento, visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-lg shadow space-y-4"
      >
        <h2 className="text-xl font-bold text-blue-700">
          {medicamento ? 'Editar medicamento' : 'Nuevo medicamento'}
        </h2>

        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del medicamento"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full border px-3 py-2 rounded"
          rows={2}
          required
        />

        <input
          type="text"
          name="presentacion"
          value={form.presentacion}
          onChange={handleChange}
          placeholder="Presentación (ej. Tableta 500mg)"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="laboratorio"
          value={form.laboratorio}
          onChange={handleChange}
          placeholder="Laboratorio"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {medicamento ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MedicamentoFormModal;
