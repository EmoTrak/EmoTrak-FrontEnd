import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponseHeaders } from "axios";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export interface Idtype {
  id: number;
}

export interface DateType {
  year: number;
  month: number;
  date?: number;
  day?: number;
}
export interface IToggle {
  isActive: boolean;
}
interface DataType {
  day: number;
  emoId: number;
  star: number;
  detail: string;
  restrict: boolean;
  share: boolean;
  draw: boolean;
}

export type DetailType = ImageType & DataType;

export interface ImageType extends Idtype {
  imgUrl: string;
  emoId: number;
  nickname: string;
}

export interface InputValue extends DataType {
  year: number;
  month: number;
  deleteImg: boolean;
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
  diaryDay: Partial<DateType>;
  item: Partial<DateType>;
  today: DateType;
}

export interface KeyType {
  [key: string]: string;
}

export interface PropsType {
  diaryDay?: Partial<DateType>;
}

export interface BooleanType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ModalState = BooleanType[];

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
  commentData: CommentData[];
  index: number;
  item: CommentData;
}

export interface CommentData extends CommentType {
  likesCnt: number;
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
  select: DateType;
  setSelect: React.Dispatch<React.SetStateAction<DateType>>;
}

export interface Position {
  top: number;
  left: number;
}
export interface ContentProps {
  newItem: InputValue;
}
export interface CanvasProps {
  width: number;
  height: number;
}

export interface InputListProps extends PropsWithChildren {
  name: string;
}

export interface LikeType extends Idtype {
  isLike: boolean;
  count: number;
}

export interface StarProps extends ComponentPropsWithoutRef<"button"> {
  size?: string;
  color?: string;
  score?: boolean;
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
  important?: boolean;
}

export interface CheckProps {
  checked: boolean;
}
export interface PropsData {
  month: number;
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

export type SignInfo = LoginInfo & { nickname: string; emailCheck: string };

export interface PostInput {
  inputValue: InputValue;
  dailyId?: number;
  canvasRef?: React.RefObject<HTMLCanvasElement> | null;
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

export interface LoginInfo {
  email: string;
  password: string;
}

export interface InfoType extends LoginInfo {
  nickname: string;
  rePassword: string;
}
export interface Validation {
  email: boolean;
  nickname: boolean;
  password: boolean;
}

export interface HelperText {
  important?: boolean;
}

export interface UrlType {
  url: string;
}
export interface SrcType {
  src: string;
}

export interface SizeType {
  size: number;
}

export interface EmoButtonProps {
  selected: boolean;
}

export interface PenProps extends ColorType {
  selectedSize: number;
  onSizeSelect(size: number): void;
  setSelectPen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ButtonSize = SizeType & ColorType;

export interface ColorType {
  color: string;
}

export interface Logout {
  logout: () => void;
}

export interface AxiosError {
  config: AxiosRequestConfig;
  code: string;
  message: string;
  name: string;
  isAxiosError: boolean;
  response: AxiosResponse;
  request: AxiosRequestHeaders;
}
interface AxiosResponse {
  data: { data: null; errorCode: string; message: string; statusCode: number };
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig;
}
