import Star from "../../../components/Icon/Star";
import { themeColor } from "../../../utils/theme";

interface Test {
  arr: boolean[];
  action: (item: number) => void;
}

const StarScore = ({ arr, action }: Test) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((score) => (
        <Star
          key={score}
          size="30"
          color={
            arr[score - 1] ? themeColor.palette.yellow : themeColor.main.oatmeal
          }
          onClick={() => action(score)}
        />
      ))}
    </>
  );
};

export default StarScore;
