import { useEffect, useState } from 'react';

function PacienteFormModal({ visible, onClose, onSave, paciente }) {
  const [form, setForm] = useState({
    nombre: '',
    dni: '',
    fecha_nacimiento: '',
    telefono: '',
    direccion: '',
    email: '',
  });

  useEffect(() => {
    if (paciente) {
      setForm(paciente);
    } else {
      setForm({
        nombre: '',
        dni: '',
        fecha_nacimiento: '',
        telefono: '',
        direccion: '',
        email: '',
      });
    }
  }, [paciente]);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-blue-700">
          {paciente ? 'Editar paciente' : 'Nuevo paciente'}
        </h2>

        {['nombre', 'dni', 'fecha_nacimiento', 'telefono', 'direccion', 'email'].map((field) => (
          <input
            key={field}
            type={field === 'fecha_nacimiento' ? 'date' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replace('_', ' ').toUpperCase()}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        ))}

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
            {paciente ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PacienteFormModal;
