function Tabla({ headers, rows, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-blue-600 text-white text-sm">
          <tr>
            {headers.map((head, i) => (
              <th key={i} className="text-left px-4 py-3 border-b border-blue-500">{head}</th>
            ))}
            <th className="px-4 py-3 border-b border-blue-500">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-100 border-b border-gray-200">
              {Object.values(row).map((val, j) => (
                <td key={j} className="px-4 py-3 whitespace-nowrap">{val}</td>
              ))}
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => onEdit(row)}
                  className="text-blue-600 hover:underline hover:font-medium transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="text-red-600 hover:underline hover:font-medium transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;
