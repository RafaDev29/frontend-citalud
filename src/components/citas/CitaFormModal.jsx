import { useState, useEffect } from 'react';

function CitaFormModal({ visible, onClose, onSave, pacientes, cita }) {
  const [form, setForm] = useState({
    paciente: '',
    fecha_cita: '',
    motivo: '',
    estado: 'PENDIENTE',
  });

  useEffect(() => {
    if (cita) {
      setForm({
        paciente: cita.paciente?.id || cita.paciente,
        fecha_cita: cita.fecha_cita,
        motivo: cita.motivo,
        estado: cita.estado,
      });
    } else {
      setForm({
        paciente: '',
        fecha_cita: '',
        motivo: '',
        estado: 'PENDIENTE',
      });
    }
  }, [cita, visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      paciente: parseInt(form.paciente),
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
          {cita ? 'Editar cita' : 'Nueva cita'}
        </h2>

        <select
          name="paciente"
          value={form.paciente}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Seleccionar paciente</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} (DNI: {p.dni})
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="fecha_cita"
          value={form.fecha_cita}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="motivo"
          value={form.motivo}
          onChange={handleChange}
          placeholder="Motivo"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="ATENDIDA">ATENDIDA</option>
          <option value="CANCELADA">CANCELADA</option>
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {cita ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CitaFormModal;
