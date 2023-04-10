// 지현
export type date = {
  year: number;
  month: number;
  date?: number;
  day?: number;
};

interface DataDetail {
  id: number;
  day: number;
  emoId: number;
  detail: string;
}

export type DayProps = {
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
};

export type KeyType = {
  [key: string]: string;
};

export type PropsType = {
  children: React.ReactNode;
  diaryDay?: Partial<date>;
};

export type BooleanType = {
  open: boolean;
  // setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // setOpen: (open: boolean) => boolean;
  setOpen: (open: boolean) => void;
};

export type open = boolean;
export type setOpen = React.Dispatch<React.SetStateAction<boolean>>;
// setOpen: () => void;

export type ModalState = BooleanType[];
