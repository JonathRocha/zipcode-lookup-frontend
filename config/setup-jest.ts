import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { configure } from "@testing-library/dom";

configure({ testIdAttribute: "id" });

jest.setTimeout(10000);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});
