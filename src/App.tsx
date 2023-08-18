import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {

  const total = items;
  const [perPage, setPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  function displayData(page: number): string[] {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const pageData = total.slice(startIndex, endIndex);
    
    return pageData;
  }

  const currentElements = displayData(currentPage);

  console.log((total.indexOf(currentElements[0])+1), (total.indexOf(currentElements[currentElements.length - 1])+1));
  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {total.indexOf(currentElements[0])+1} - {total.indexOf(currentElements[currentElements.length - 1])+1} of {total.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => {
              const value = +(e.target.value)
              if(perPage !== value) {
                setCurrentPage(1)
                setPerPage(value);
              }
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination 
        total = {total}
        perPage = {perPage}
        currentPage ={currentPage}
        onPageChange = {(page: number) => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {currentElements.map((item, index) => (
          <li key={index} data-cy="item">{item}</li>
        ))}
        {/* <li data-cy="item">Item 1</li>
        <li data-cy="item">Item 2</li>
        <li data-cy="item">Item 3</li>
        <li data-cy="item">Item 4</li>
        <li data-cy="item">Item 5</li> */}
      </ul>
    </div>
  );
};

export default App;
