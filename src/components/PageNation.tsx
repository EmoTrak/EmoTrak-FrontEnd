import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Icon from "react-icons/md";

const PageNation = (props: any) => {
  const { page, setPage, data } = props;

  const [pageArr, setPageArr] = useState([1, 2, 3, 4, 5]);

  const lastPage = Math.ceil(data.totalComments / 20);

  useEffect(() => {
    if (page === 1 || page === 2) {
      setPageArr([1, 2, 3, 4, 5]);
    } else if (page === lastPage - 1 || page === lastPage) {
      setPageArr([lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage]);
    } else {
      setPageArr([page - 2, page - 1, page, page + 1, page + 2]);
    }
  }, [page]);

  return (
    <>
      <Container>
        {page !== 1 && page !== 2 && page !== 3 && (
          <>
            <ArrowBtn onClick={() => setPage(1)}>
              <Icon.MdKeyboardDoubleArrowLeft />
            </ArrowBtn>
            <ArrowBtn onClick={() => setPage(page - 1)}>
              <Icon.MdKeyboardArrowLeft />
            </ArrowBtn>
          </>
        )}

        {pageArr.map((item) => (
          <PageBtn
            onClick={() => setPage(item)}
            key={item}
            currentPage={item === page}
            disabled={item === page}
          >
            {item}
          </PageBtn>
        ))}
        {page !== lastPage && page !== lastPage - 1 && page !== lastPage - 2 && (
          <>
            <ArrowBtn onClick={() => setPage(page + 1)}>
              <Icon.MdKeyboardArrowRight />
            </ArrowBtn>
            <ArrowBtn onClick={() => setPage(lastPage)}>
              <Icon.MdKeyboardDoubleArrowRight />
            </ArrowBtn>
          </>
        )}
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;
const PageBtn = styled.button<{ currentPage: boolean }>`
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  cursor: ${(props) => (props.currentPage ? "auto" : "pointer")};
  font-size: 17px;
  color: ${(props) => (props.currentPage ? "black" : "#6d6c6c")};
  font-weight: ${(props) => props.currentPage && 800};
  &:hover {
    background-color: ${(props) => !props.currentPage && "#D0BD95"};
    color: ${(props) => !props.currentPage && "white"};
    font-weight: 800;
  }
  &:active {
    background-color: ${(props) => !props.currentPage && "#DADADA"};
    color: ${(props) => !props.currentPage && "white"};
  }
`;
const ArrowBtn = styled.button`
  cursor: pointer;
  border: 0;
  background-color: transparent;
  font-size: 23px;
  display: flex;
  align-items: center;
  color: #7d7d7d;
`;
export default PageNation;
