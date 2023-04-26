import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
} from "react";

export type Idtype = {
  id: number;
};

export interface date {
  year: number;
  month: number;
  date?: number;
  day?: number;
}

export interface PostDateType {
  date: string;
}
interface DataDetail extends Idtype {
  day: number;
  emoId: number;
  detail: string;
}

export interface DayProps {
  side: boolean;
  setSide: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    year: number;
    month: number;
    contents: DataDetail[];
  };
  diaryDay: Partial<date>;
  item: Partial<date>;
  today: date;
  children: React.ReactNode;
}

export interface KeyType {
  [key: string]: string;
}

export interface PropsType {
  diaryDay?: Partial<date>;
}

export type BooleanType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ModalState = BooleanType[];

export interface ImageType extends Idtype {
  imgUrl: string;
}

export interface SelectType {
  emo: string;
  size: number;
  sort: string;
}

export interface CommentType {
  comment: string;
}

export interface CommentProps extends Idtype {
  paramId: number;
  commentData: commentData[];
  index: number;
  item: commentData;
}

export interface commentData {
  likesCnt: number;
  comment: string;
  createdAt: string;
  email: string;
  hasAuth: boolean;
  id?: number;
  nickname: string;
  hasLike: boolean;
  hasReport: boolean;
}

export interface UriType {
  uri: string;
}

export type DateSelectType = {
  select: date;
  setSelect: React.Dispatch<React.SetStateAction<date>>;
};

export type Position = {
  top: number;
  left: number;
};
// parking
export type ContentProps = {
  newItem: InputValue;
};
export type CanvasProps = {
  width: number;
  height: number;
};

export type InputListProps = {
  important?: boolean;
  name: string;
} & PropsWithChildren;

export interface LikeType {
  isLike: boolean | undefined;
  id: number | undefined;
  count: number | undefined;
}

export type StarProps = {
  size?: string;
  color?: string;
} & ComponentPropsWithoutRef<"button">;
export interface IProps {
  emotionTypes: string;
  height: string;
  width: string;
}

export type FlexType = {
  row: boolean;
  gap: number;
  jc: string;
  ai: string;
};

export type ButtonProps = {
  icon?: boolean;
  circle?: boolean;
  size?: string;
} & ComponentPropsWithoutRef<"button">;

export type CheckProps = {
  checked: boolean;
};
export interface PropsData {
  month: number | string;
  graphData: graphDataType[];
}

export interface graphDataType {
  month: number;
  graph: Graph[];
}

export interface Graph {
  id: number;
  count: number;
  percentage: number;
}

export interface IAdminData extends Idtype {
  reportId: number;
  nickname: string;
  email: string;
  count: number;
  reason: string;
}

export interface IPayload {
  auth: string;
}

export type RouterProps = {
  token: string;
  isAuthenticated: boolean;
  pathname: string;
  isAdminAuthenticated?: string | boolean;
  children: ReactElement;
  isAuthAdmin: boolean;
  AlreadyLogin: boolean;
  refreshToken: string;
};

// 1nxeo

export type LoginInfo = {
  email: string;
  password: string;
};

export type SignInfo = LoginInfo & { nickname: string };

export interface PostInput {
  inputValue: InputValue;
  dailyId?: number;
  canvasRef?: React.RefObject<HTMLCanvasElement> | null;
}
export interface Validation {
  email: boolean;
  nickname: boolean;
  password: boolean;
}

export interface CookieOption {
  path: string;
  maxAge?: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface PositionProps {
  position: number;
  url?: string;
}

export interface BannerProps {
  index: number;
}

export interface DeleteModalProps {
  children: React.ReactNode;
  itemId: number;
}

export interface PaletteProps {
  selectedColor: string;
  onColorSelect(color: string): void;
  setSelectPen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DetailType = {
  day: number;
  emoId: number;
  star: number;
  detail: string;
  imgUrl: string | null;
  restrict: boolean;
  share: boolean;
  draw: boolean;
} & Idtype;

export type InfoType = {
  email: string;
  nickname: string;
  password: string;
  rePassword: string;
};

export interface HelperText {
  important?: boolean;
}

export type StPreviewProps = {
  url: string;
};

export interface IconProps {
  url?: string;
  size?: number;
}

export type EmoButtonProps = {
  selected: boolean;
};

export type InputValue = {
  draw: boolean;
  year: number;
  month: number;
  day: number;
  emoId: number;
  star: number;
  detail: string;
  deleteImg: boolean;
  share: boolean;
  restrict: boolean;
};

export interface PenProps {
  color: string;
  selectedSize: number;
  onSizeSelect(size: number): void;
  setSelectPen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ButtonSize {
  size: number;
  color: string;
}

export type Logout = { logout: () => void };
