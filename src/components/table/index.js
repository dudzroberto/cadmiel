import React from "react";

const Table = ({ json }) => {
  const headers = Object.keys(json[0]);
  return (
    <table className="table table-sm table-hover table-responsive">
      <thead class="table-primary">
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {json.map((item) => (
          <tr key={item.os}>
            {headers.map((header) => (
              <td style={{backgroundColor: item['duplicado'] ? 'red' : 'none' }} key={header}>{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
