import React from "react";
import { render } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";
import App from "./App";

describe.skip("AppComponent", () => {
  test("renders learn react link", () => {
    const { getByText }: RenderResult = render(<App />);
    const linkElement = getByText(/職務経歴書/i);
    expect(linkElement).toBeInTheDocument();
  });
});
