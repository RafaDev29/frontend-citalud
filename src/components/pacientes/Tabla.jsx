function Tabla({ headers, rows, onEdit, onDelete }) {
    return (
      <table className="min-w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            {headers.map((head, i) => (
              <th key={i} className="text-left px-4 py-2">{head}</th>
            ))}
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t hover:bg-gray-100">
              {Object.values(row).map((val, j) => (
                <td key={j} className="px-4 py-2">{val}</td>
              ))}
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => onEdit(row)} className="text-blue-600 hover:underline">Editar</button>
                <button onClick={() => onDelete(row.id)} className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default Tabla;
  