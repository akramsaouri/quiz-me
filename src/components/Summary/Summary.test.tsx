import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Summary from "./Summary";

describe("Summary", () => {
  it("render perfect score in summary when correct answers equals questionCout", async () => {
    const { container } = render(
      <Summary correctAnswers={10} wrongAnswers={0} questionCount={10} />
    );
    expect(await screen.findByText(/Perfect score/)).toBeVisible();
    expect(container).toHaveTextContent(/Number of wrong answers0/);
  });
  it("render summary with correct score", async () => {
    const { container } = render(
      <Summary correctAnswers={4} wrongAnswers={6} questionCount={10} />
    );
    expect(container).toHaveTextContent(/Number of wrong answers6/);
    expect(container).toHaveTextContent(/Number of correct answers4/);
    expect(container).toHaveTextContent(/Score40%/);
  });
});
