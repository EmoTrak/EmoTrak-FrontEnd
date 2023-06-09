import { useEffect, useState } from "react";
import { themeColor } from "../utils/theme";
import styled from "styled-components";
import * as Icon from "react-icons/md";

interface IPageNation {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  size: number;
}

const PageNation = (props: IPageNation) => {
  const { page, setPage, totalCount, size } = props;

  const [pageArr, setPageArr] = useState([1, 2, 3, 4, 5]);

  const lastPage = Math.ceil(totalCount / size);

  useEffect(() => {
    if (lastPage <= 5) {
      const newArr = new Array(lastPage).fill(null).map((_, i) => i + 1);
      setPageArr(newArr);
    } else if (page === 1 || page === 2) {
      setPageArr([1, 2, 3, 4, 5]);
    } else if (page === lastPage - 1 || page === lastPage) {
      setPageArr([
        lastPage - 4,
        lastPage - 3,
        lastPage - 2,
        lastPage - 1,
        lastPage,
      ]);
    } else {
      setPageArr([page - 2, page - 1, page, page + 1, page + 2]);
    }
  }, [page]);

  return (
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
      {lastPage !== 1 &&
        pageArr.map((item) => (
          <PageBtn
            onClick={() => setPage(item)}
            key={item}
            currentPage={item === page}
            disabled={item === page}
          >
            {item}
          </PageBtn>
        ))}
      {lastPage > 5 &&
        page !== lastPage &&
        page !== lastPage - 1 &&
        page !== lastPage - 2 && (
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
  color: ${(props) =>
    props.currentPage ? themeColor.main.black : themeColor.main.black};
  font-weight: ${(props) => props.currentPage && 800};
  &:hover {
    background-color: ${(props) =>
      !props.currentPage && themeColor.main.coffemilk};
    color: ${(props) => !props.currentPage && themeColor.main.white};
    font-weight: 800;
  }
  &:active {
    background-color: ${(props) => !props.currentPage && themeColor.main.gray};
    color: ${(props) => !props.currentPage && themeColor.main.white};
  }
`;
const ArrowBtn = styled.button`
  cursor: pointer;
  border: 0;
  background-color: transparent;
  font-size: 23px;
  display: flex;
  align-items: center;
  color: ${themeColor.main.gray};
`;
export default PageNation;
