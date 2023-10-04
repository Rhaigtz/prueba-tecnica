import { Direction } from "@/enum/direction.enum";

export interface List {
  skip?: number;

  take?: number;

  sortField?: string;

  sortOrder?: Direction;

  search?: string;
}
