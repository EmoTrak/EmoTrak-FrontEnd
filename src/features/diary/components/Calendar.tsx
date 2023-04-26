import { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Flex from "../../../components/Flex";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";
import { DateType } from "../../../data/type/type";
import CalendarEmo from "./CalendarEmo";
import MiniCalendar from "./MiniCalendar";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MonthSelect from "./MonthSelect";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import Button from "../../../components/Button";
import { getCookie } from "../../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { device, themeColor } from "../../../utils/theme";

const Calendar = () => {
  const token = getCookie("token");
  const navigate = useNavigate();

  const [side, setSide] = useState(false);
  const today: DateType = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };

  // 날짜 선택
  const [select, setSelect] = useState<DateType>({
    year: today.year,
    month: today.month,
    date: today.date,
  });

  const lastDate: number = new Date(select.year, select.month, 0).getDate();
  const firstDay: number = new Date(select.year, select.month - 1, 1).getDay();

  //해당 날짜의 값 가져오는 함수
  const clickDayBtn = (day: number): void => {
    setSide(true);
    setSelect({ ...select, date: day });
  };

  // 날짜 변환 함수
  const date = new Array(lastDate).fill(null).map(
    (_, i): DateType => ({
      year: select.year,
      month: select.month,
      date: i + 1,
      day: new Date(select.year, select.month - 1, i + 1).getDay(),
    })
  );

  const prevMonth = (): void => {
    select.month === 1
      ? setSelect({ month: 12, year: select.year - 1 })
      : setSelect({ ...select, month: select.month - 1 });
  };

  const nextMonth = (): void => {
    select.month === 12
      ? setSelect({ month: 1, year: select.year + 1 })
      : setSelect({ ...select, month: select.month + 1 });
  };

  const thisMonth = (): void => {
    setSelect({ year: today.year, month: today.month });
  };

  const { data, isError } = useQuery({
    queryKey: [keys.GET_DIARY, select.year, select.month],
    queryFn: async () => {
      const data = await user.get("/daily", {
        params: { year: select.year, month: select.month },
      });
      return data.data.data;
    },
  });

  return (
    <Container>
      <Flex ai="center">
        <MiniCalendar year={select.year} month={select.month - 1} />
        <MiniCalendar year={select.year} month={select.month + 1} />
      </Flex>
      <CalendarBox>
        <SelectWrap>
          <NowDay>
            <span>
              {select.year}년 {select.month}월
            </span>
            <p />
            <MonthSelect select={select} setSelect={setSelect}>
              <SelectBtn>
                <MdOutlineArrowDropDownCircle />
              </SelectBtn>
            </MonthSelect>
          </NowDay>

          <CalendarBtn>
            <Button icon size="x-small" onClick={prevMonth}>
              <AiOutlineLeft />
            </Button>
            <Button size="x-small" onClick={thisMonth}>
              오늘
            </Button>
            <Button icon size="x-small" onClick={nextMonth}>
              <AiOutlineRight />
            </Button>
          </CalendarBtn>
        </SelectWrap>
        <TotalWeek>
          <Weeks style={{ color: "red" }}>SUN</Weeks>
          <Weeks>MON</Weeks>
          <Weeks>TUE</Weeks>
          <Weeks>WED</Weeks>
          <Weeks>THU</Weeks>
          <Weeks>FRI</Weeks>
          <Weeks>SAT</Weeks>
        </TotalWeek>
        <DiaryDay>
          {new Array(firstDay).fill(null).map((e, i) => (
            <Day key={i}></Day>
          ))}
          {date.map((item) => {
            // 전년도일때
            if (item.year < today.year && item.day === 0) {
              return (
                <Sunday
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </Sunday>
              );
            } else if (item.year < today.year) {
              return (
                <Day
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </Day>
              );
            }
            // 올해 && 이전달일때
            else if (
              item.year === today.year &&
              item.month < today.month &&
              item.day === 0
            ) {
              return (
                <Sunday
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </Sunday>
              );
            } else if (item.year === today.year && item.month < today.month) {
              return (
                <Day
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </Day>
              );
            }
            // 이번달 오늘까지
            else if (
              item.year === today.year &&
              item.month === today.month &&
              Number(item.date) <= Number(today.date) &&
              item.day === 0
            ) {
              return (
                <Sunday
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </Sunday>
              );
            } else if (
              item.year === today.year &&
              item.month === today.month &&
              Number(item.date) <= Number(today.date)
            ) {
              return (
                <Day
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </Day>
              );
            } else if (item.day === 0) {
              return <Sunday key={item.date}>{item.date}</Sunday>;
            } else {
              return <Day key={item.date}>{item.date}</Day>;
            }
          })}
        </DiaryDay>
      </CalendarBox>

      {side && (
        <Sidebar side={side} setSide={setSide} data={data} diaryDay={select} />
      )}
    </Container>
  );
};

const SelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const CalendarBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const Container = styled.div`
  display: flex;
  background-color: ${themeColor.main.white};
  height: 100vh;
  ${device.tablet} {
    padding-left: 10px;
  }
  ${device.mobile} {
    padding-left: 5px;
    height: 90vh;
  }
  ${device.miniMobile} {
    padding-left: 5px;
    height: 60vh;
  }
`;

const NowDay = styled.div`
  margin: 15px;
  display: flex;
  justify-content: center;
  span {
    font-size: 21px;
    position: relative;
    z-index: 3;
  }
  p {
    background-color: ${themeColor.emoticon.yellow};
    border-radius: 10px;
    width: 115px;
    height: 16px;
    position: absolute;
    top: 10px;
    z-index: 2;
  }
`;

const SelectBtn = styled.button`
  position: absolute;
  top: 20px;
  border: 0;
  background-color: transparent;
  font-size: 20px;
  color: ${themeColor.main.coffemilk};
  cursor: pointer;
`;

const CalendarBox = styled.div`
  margin-left: auto;
  margin-right: auto;

  ${device.mobile} {
    margin-left: 0px;
    margin-right: 3px;
  }
`;

const DiaryDay = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 80%;
  ${device.mobile} {
    max-height: 65%;
  }
`;
const TotalWeek = styled.div`
  min-width: calc(100% / 7);
  display: flex;
`;

const Weeks = styled.div`
  min-width: calc(100% / 7);
  display: flex;
  justify-content: center;
  border: 0;
  font-size: 15px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  font-family: "KyoboHand";

  ${device.mobile} {
    font-size: 13px;
  }
`;
const Day = styled.button`
  min-width: calc(100% / 7);
  display: flex;
  border: 0;
  font-size: 18px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  font-family: "KyoboHand";
  cursor: pointer;

  ${device.mobile} {
    font-size: 13px;
  }
`;

const Sunday = styled.button`
  min-width: calc(100% / 7);
  border: 0;
  display: flex;
  font-size: 18px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  font-family: "KyoboHand";
  cursor: pointer;
  color: ${themeColor.palette.red};

  ${device.mobile} {
    font-size: 13px;
  }
`;

export default Calendar;
