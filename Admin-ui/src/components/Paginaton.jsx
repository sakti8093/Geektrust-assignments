import { AiOutlineCaretRight } from "react-icons/ai"
import { AiOutlineCaretLeft } from "react-icons/ai"

export const Paginaton = ({ currentPage, handlePageChange, pageButtons }) => {

  return (
    <div className="paginate-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page"
      >
        <AiOutlineCaretLeft fontSize={30} />
      </button>
      {pageButtons?.map((pages) => (
        <button
          style={{
            backgroundColor: currentPage === pages ? "crimson" : "",
            color: currentPage === pages ? "white" : "black",
          }}
          onClick={() => handlePageChange(pages)}
          key={pages}
        >
          {pages}
        </button>
      ))}
      <button
        disabled={ pageButtons.length===0 || currentPage === pageButtons[pageButtons.length - 1]}
        onClick={() => handlePageChange(currentPage + 1)}
        className="page"
      >
        <AiOutlineCaretRight fontSize={30} />
      </button>
    </div>
  );
};
