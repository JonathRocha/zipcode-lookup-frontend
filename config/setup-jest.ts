import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

jest.setTimeout(10000);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});
