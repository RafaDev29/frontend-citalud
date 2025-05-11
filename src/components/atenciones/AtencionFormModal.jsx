import { useState, useEffect } from 'react';

function AtencionFormModal({ visible, onClose, onSave, citas, atencion }) {
  const [form, setForm] = useState({
    cita: '',
    diagnostico: '',
    recomendaciones: '',
  });

  useEffect(() => {
    if (atencion) {
      setForm({
        cita: atencion.cita?.id || atencion.cita,
        diagnostico: atencion.diagnostico,
        recomendaciones: atencion.recomendaciones,
      });
    } else {
      setForm({
        cita: '',
        diagnostico: '',
        recomendaciones: '',
      });
    }
  }, [atencion, visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      cita: parseInt(form.cita),
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4 shadow"
      >
        <h2 className="text-xl font-bold text-blue-700">
          {atencion ? 'Editar atención' : 'Nueva atención'}
        </h2>

        <select
          name="cita"
          value={form.cita}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Seleccionar cita</option>
          {citas.map((c) => (
            <option key={c.id} value={c.id}>
              Cita #{c.id} - {typeof c.paciente === 'object' ? c.paciente.nombre : ''}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="diagnostico"
          value={form.diagnostico}
          onChange={handleChange}
          placeholder="Diagnóstico"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="recomendaciones"
          value={form.recomendaciones}
          onChange={handleChange}
          placeholder="Recomendaciones"
          className="w-full border px-3 py-2 rounded"
          rows={3}
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
            {atencion ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AtencionFormModal;
