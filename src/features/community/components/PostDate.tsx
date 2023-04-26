import { PostDateType } from "../../../data/type/type";

const PostDate = ({ date }: PostDateType) => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
  };

  const post = {
    postYear: Number(date.split(" ")[0].split("-")[0]),
    postMonth: Number(date.split(" ")[0].split("-")[1]),
    postDate: Number(date.split(" ")[0].split("-")[2]),
    postHour: Number(date.split(" ")[1].split(":")[0]),
    postMinute: Number(date.split(" ")[1].split(":")[1]),
    postSecond: Number(date.split(" ")[1].split(":")[2]),
  };

  const yearDiff = today.year - post.postYear;
  const monthDiff = today.month - post.postMonth;
  const dateDiff = today.date - post.postDate;
  const hourDiff = today.hour - post.postHour;
  const minuteDiff = today.minute - post.postMinute;
  const secondDiff = today.second - post.postSecond;

  const NowDate = () => {
    if (yearDiff > 0) {
      return <>{yearDiff}년 전</>;
    } else if (monthDiff > 0) {
      return <>{monthDiff}개월 전</>;
    } else if (dateDiff > 7) {
      return <>{Math.floor(dateDiff / 7)}주 전</>;
    } else if (dateDiff > 0) {
      return <>{dateDiff}일 전</>;
    } else if (hourDiff > 0) {
      return <>{hourDiff}시간 전</>;
    } else if (minuteDiff > 0) {
      return <>{minuteDiff}분 전</>;
    } else if (minuteDiff === 0) {
      return <>{secondDiff}초 전</>;
    }
  };
  return <div>{NowDate()}</div>;
};

export default PostDate;
