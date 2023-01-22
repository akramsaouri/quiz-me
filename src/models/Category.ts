export interface Category {
  name: string;
  id: string;
}

export interface CategoryWithCount extends Category {
  questionCount: number;
}
