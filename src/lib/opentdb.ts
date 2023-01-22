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
