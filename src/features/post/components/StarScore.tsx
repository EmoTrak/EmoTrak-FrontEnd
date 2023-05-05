import styled from "styled-components";
import Star from "../../../components/Icon/Star";
import { themeColor } from "../../../utils/theme";

interface Test {
  arr: boolean[];
  action: (item: number) => void;
}

const StarScore = ({ arr, action }: Test) => {
  return (
    <StarScoreBox>
      {[5, 4, 3, 2, 1].map((score) => (
        <Star
          key={score}
          size="30"
          color={
            arr[score - 1] ? themeColor.palette.yellow : themeColor.main.oatmeal
          }
          score
          onClick={() => action(score)}
        />
      ))}
    </StarScoreBox>
  );
};

export default StarScore;

const StarScoreBox = styled.div`
  display: flex;
  flex-direction: row-reverse;

  button {
    cursor: pointer;

    &:hover svg {
      fill: ${themeColor.palette.yellow};
      stroke: ${themeColor.palette.yellow};
    }

    &:hover ~ button svg {
      fill: ${themeColor.palette.yellow};
      stroke: ${themeColor.palette.yellow};
    }
  }
`;
