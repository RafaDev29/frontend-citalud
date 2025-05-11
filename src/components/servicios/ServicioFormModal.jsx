import { useState, useEffect } from 'react';

function ServicioFormModal({ visible, onClose, onSave, servicio }) {
  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    descripcion: '',
    precio: '',
  });

  useEffect(() => {
    if (servicio) {
      setForm({
        nombre: servicio.nombre,
        tipo: servicio.tipo,
        descripcion: servicio.descripcion,
        precio: servicio.precio,
      });
    } else {
      setForm({
        nombre: '',
        tipo: '',
        descripcion: '',
        precio: '',
      });
    }
  }, [servicio, visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      precio: parseFloat(form.precio), // asegurar que es número
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-lg shadow space-y-4"
      >
        <h2 className="text-xl font-bold text-blue-700">
          {servicio ? 'Editar servicio' : 'Nuevo servicio'}
        </h2>

        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del servicio"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          placeholder="Tipo (Ej. Ecografía)"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full border px-3 py-2 rounded"
          rows={3}
          required
        />

        <input
          type="number"
          step="0.01"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
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
            {servicio ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServicioFormModal;
