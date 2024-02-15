import React, { useState } from "react";
import "./App.css";
const CSVReaderComponent = () => {
  const [csvContent, setCSVContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 50;

  const handleFileRead = (e) => {
    const content = e.target.result;
    setCSVContent(content);
    setCurrentPage(1); // Reset to first page when new file is loaded
  };

  const handleFileChosen = (file) => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    setFileName(file.name);
  };

  // Extract column names from CSV content
  // const columnNames = csvContent.split("\n")[0].split("\t");
  const columnNames = csvContent.split("\n")[0];
  console.log(columnNames);
  // Parse CSV content to create table rows
  //   const tableRows = currentContents.map((content, index) => {
  //     const columns = content.split(",");
  //     return (
  //       <tr key={index}>
  //         {columns.map((column, colIndex) => (
  //           <td key={colIndex}>{column}</td>
  //         ))}
  //       </tr>
  //     );
  //   });
  const tablerows = csvContent.split("\n");
  console.log(tablerows);
  const indexOfLastRow = currentPage * contentsPerPage;
  const indexOfFirstRow = indexOfLastRow - contentsPerPage;
  const currentRows = tablerows.slice(indexOfFirstRow, indexOfLastRow);
  const numPages = Math.ceil(tablerows.length / contentsPerPage);
  const pages = Array.from({ length: numPages }, (_, index) => index + 1);
  // Change page
  const nextPage = () => {
    if (indexOfLastRow < tablerows.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // const formattedRows = rows.map((row) => {
  //   const columns = row.split(",");
  //   return `(${columns.join(",")})`;
  // });
  const EachColumn = (props) => {
    if (props.data) {
      const rows = props.data.split("\t");
      return (
        <>
          {rows.map((item, index) => (
            <>
              {/* <div className="eachBox">{item}</div> */}
              <div className="eachBox">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </div>
            </>
          ))}{" "}
        </>
      );
    }
  };

  return (
    <div>
      <div className="heading">CSV FILE READER</div>
      <div className="fileinput">
        <input
          type="file"
          id="fileInput"
          accept=".csv"
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />
      </div>
      {csvContent && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Current Page:{currentPage}</span>
          <button
            onClick={nextPage}
            disabled={indexOfLastRow >= tablerows.length}
          >
            Next
          </button>
        </div>
      )}
      <div className="entireTable">
        {currentPage !== 1 && (
          <div className="eachRow">{<EachColumn data={columnNames} />}</div>
        )}
        {currentRows.map((row, index) => (
          <div className="eachRow" key={index}>
            <EachColumn data={row} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSVReaderComponent;
