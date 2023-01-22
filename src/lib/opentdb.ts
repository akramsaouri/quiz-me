import { Category, Trivia } from "@/models";
import axios, { AxiosResponse } from "axios";

export const client = axios.create({
  baseURL: "https://opentdb.com",
});

export const QUIZ_LENGTH = 10;
export const QUIZ_TYPE = "boolean";

interface GetCategoriesResponse {
  trivia_categories: Category[];
}

export const getCategories = (): Promise<
  AxiosResponse<GetCategoriesResponse>
> => {
  return client.get("/api_category.php");
};

interface GetTriviaResponse {
  response_code: number;
  results: Trivia[];
}

export const getTrivia = (
  categoryID: string
): Promise<AxiosResponse<GetTriviaResponse>> => {
  return client.get(
    `api.php?amount=${QUIZ_LENGTH}&category=${categoryID}&type=${QUIZ_TYPE}`
  );
};

interface LookupCategoryResponse {
  category_id: number;
  category_question_count: {
    total_question_count: number;
    total_easy_question_count: number;
    total_medium_question_count: number;
    total_hard_question_count: number;
  };
}

export const lookupCategory = (
  categoryID: string
): Promise<AxiosResponse<LookupCategoryResponse>> => {
  return client.get(`/api_count.php?category=${categoryID}`);
};
