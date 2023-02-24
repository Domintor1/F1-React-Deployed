const TableComponent = ({ th, tableData, td }) => {
  return (
    <div className="table-responsive mapped">
      <table className="table table-striped">
        <thead>
          <tr>
            {th.map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              {td.map((data, i) => (
                <td key={i}>{item[data]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
