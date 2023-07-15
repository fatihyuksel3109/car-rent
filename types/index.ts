import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  selected: string;
  setSelected: (manufacturer: string) => void;
}
export interface SearchBarProps {
  setManufacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
}
export interface CarProps {
  model: string;
  make: string;
  class: string;
  combination_mpg: number;
  cylinders: number;
  drive: string;
  city_mpg: number;
  highway_mpg: number;
  transmission: string;
  fuel_type: string;
  displacement: number;
  year: number;
}
export interface FilterProps {
  model: string;
  manufacturer: string;
  transmission: string;
  fuel: string;
  year: number;
  limit: number;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
  setFilter: (filter:any) => void;

}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
  setLimit: (limit: number) => void;
}
