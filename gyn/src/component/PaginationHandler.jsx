// src/Component/PaginationHandler.jsx
import React from 'react';

const PaginationHandler = ({ page, setPage, hasMoreData, fetchData, filter, searchQuery }) => {
  const prevPage = page > 1 ? page - 1 : null;

  return (
    <div className="pagination-bar">
      {prevPage && (
        <button
          className="page-button"
          onClick={() => {
            setPage(prevPage);
            fetchData(prevPage, filter, searchQuery);
          }}
        >
          {'<'}
        </button>
      )}
      {prevPage && (
        <button
          className="page-button"
          onClick={() => {
            setPage(prevPage);
            fetchData(prevPage, filter, searchQuery);
          }}
        >
          {prevPage}
        </button>
      )}
      <button className="page-button-current">{page}</button>
      {hasMoreData && (
        <button
          className="page-button"
          onClick={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(nextPage, filter, searchQuery);
          }}
        >
          {page + 1}
        </button>
      )}
      {hasMoreData && (
        <button
          className="page-button"
          onClick={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(nextPage, filter, searchQuery);
          }}
        >
          {'>'}
        </button>
      )}
    </div>
  );
};

export default PaginationHandler;
