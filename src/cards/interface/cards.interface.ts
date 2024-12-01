export interface Card {
  id: string;
  name: string;
  type_line: string;
  colors: string[];
  [key: string]: any;
}

export interface SearchResponse {
  data: Card[];
  has_more: boolean;
  [key: string]: any;
}
