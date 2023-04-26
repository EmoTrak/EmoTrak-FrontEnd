import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
} from "react";

export interface Idtype {
  id: number;
}

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

export interface DayProps extends PropsWithChildren {
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
}

export interface KeyType {
  [key: string]: string;
}

export interface PropsType {
  diaryDay?: Partial<date>;
}

export interface BooleanType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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

export interface UriType extends Idtype {
  uri: string;
}

export interface DateSelectType {
  select: date;
  setSelect: React.Dispatch<React.SetStateAction<date>>;
}

export interface Position {
  top: number;
  left: number;
}
// parking
export interface ContentProps {
  newItem: InputValue;
}
export interface CanvasProps {
  width: number;
  height: number;
}

export interface InputListProps extends PropsWithChildren {
  important?: boolean;
  name: string;
}

export interface LikeType extends Idtype {
  isLike: boolean;
  count: number;
}

export interface StarProps extends ComponentPropsWithoutRef<"button"> {
  size?: string;
  color?: string;
}
export interface IProps {
  emotionTypes: string;
  height: string;
  width: string;
}

export interface FlexType {
  row: boolean;
  gap: number;
  jc: string;
  ai: string;
}

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon?: boolean;
  circle?: boolean;
  size?: string;
}

export interface CheckProps {
  checked: boolean;
}
export interface PropsData {
  month: number | string;
  graphData: graphDataType[];
}

export interface graphDataType {
  month: number;
  graph: Graph[];
}

export interface Graph extends Idtype {
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

export interface RouterProps extends PropsWithChildren {
  token: string;
  isAuthenticated: boolean;
  pathname: string;
  isAdminAuthenticated?: string | boolean;
  isAuthAdmin: boolean;
  AlreadyLogin: boolean;
  refreshToken: string;
}

// 1nxeo

export interface LoginInfo {
  email: string;
  password: string;
}

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

export interface PositionProps extends UrlType {
  position: number;
}

export interface BannerProps {
  index: number;
}

export interface DeleteModalProps extends PropsWithChildren {
  itemId: number;
}

export interface PaletteProps {
  selectedColor: string;
  onColorSelect(color: string): void;
  setSelectPen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DetailType extends Idtype {
  day: number;
  emoId: number;
  star: number;
  detail: string;
  imgUrl: string | null;
  restrict: boolean;
  share: boolean;
  draw: boolean;
}

export interface InfoType {
  email: string;
  nickname: string;
  password: string;
  rePassword: string;
}

export interface HelperText {
  important?: boolean;
}

export interface UrlType {
  url: string;
}

export interface IconProps extends UrlType {
  size?: number;
}

export interface EmoButtonProps {
  selected: boolean;
}

export interface InputValue {
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
}

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

export interface Logout {
  logout: () => void;
}
