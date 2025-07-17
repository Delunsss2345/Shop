import { useRef, useState } from "react";

const Pagination = ({ getApiPage, filterList, list, name }) => {
  const [pagination, setPagination] = useState(1);
  const currentPagination = useRef(null);

  const handlePagination = (e, page) => {
    if (e.target.closest(".pagination-choice")) {
      const paginationChoices =
        currentPagination.current.querySelectorAll(".pagination-choice");

      paginationChoices.forEach((el) => {
        el.classList.remove("btn-pagination-active", "btn-pagination");
        if (el !== e.target) {
          el.classList.add("btn-pagination");
        }
      });
      getApiPage(page);
      e.target.classList.add("btn-pagination-active");
    }
  };

  const resetPagination = (fs, ns) => {
    const paginationChoices =
      currentPagination.current.querySelectorAll(".pagination-choice");

    paginationChoices.forEach((el) => {
      el.classList.remove("btn-pagination-active", "btn-pagination");
    });

    paginationChoices[fs].classList.add("btn-pagination-active");
    paginationChoices[ns].classList.add("btn-pagination");
  };

  const paginationNextOrPrev = (e, mode) => {
    if (
      mode === "next" &&
      Math.ceil(filteredUsers.length / 4) >= pagination + 1
    ) {
      setPagination(pagination + 2);
      getApiPage(pagination);

      resetPagination(0, 1);
    } else if (mode === "prev" && pagination > 2) {
      setPagination(pagination - 2);
      getApiPage(pagination);

      resetPagination(1, 0);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {filterList.length} of {list?.length || filterList.length}{" "}
          {name}
        </div>
        <div ref={currentPagination} className="flex gap-2">
          <button
            onClick={(e) => paginationNextOrPrev(e, "prev")}
            className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700 transition-colors text-sm"
          >
            Previous
          </button>
          <button
            onClick={(e) => handlePagination(e, pagination)}
            className="pagination-choice btn-pagination-active px-3 py-1 border text-white border-gray-600 rounded  transition-colors text-sm "
          >
            {pagination}
          </button>
          <button
            onClick={(e) => handlePagination(e, pagination + 1)}
            className="pagination-choice px-3 py-1 border text-white border-gray-600 rounded btn-pagination transition-colors text-sm"
          >
            {pagination + 1}
          </button>
          <button
            onClick={(e) => paginationNextOrPrev(e, "next")}
            className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700 transition-colors text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
