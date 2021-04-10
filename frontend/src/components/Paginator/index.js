import React from "react";
import { Pagination, Paginator } from "react-bootstrap";

export default function Paginate({ pages, page, changePage, pageToSearch }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            style={{ cursor: "pointer" }}
            onClick={() => changePage(x + 1)}
            className={x + 1 === pageToSearch && "paginationActive"}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
}
