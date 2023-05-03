import { InputValue } from "../../../data/type/type";
import { TextArea } from "../styles/ImageStyle";

interface Test {
  action: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: InputValue;
}

const PostInput = ({ action, value }: Test) => {
  return (
    <label>
      <TextArea
        name="detail"
        value={value?.detail}
        placeholder="오늘의 감정은 어땠나요?"
        spellCheck={false}
        required
        maxLength={1500}
        onChange={action}
      />
    </label>
  );
};

export default PostInput;
