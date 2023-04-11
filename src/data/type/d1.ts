// 지현
interface id {
  id: number;
}
export interface date {
  year: number;
  month: number;
  date?: number;
  day?: number;
}

interface DataDetail extends id {
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
  children: React.ReactNode;
  diaryDay?: Partial<date>;
}

export interface BooleanType {
  open: boolean;
  // setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // setOpen: (open: boolean) => boolean;
  setOpen: (open: boolean) => void;
}

export type ModalState = BooleanType[];

export interface Image extends id {
  imgUrl: string;
}
