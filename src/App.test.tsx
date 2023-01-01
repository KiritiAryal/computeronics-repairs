import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import store from "./store";

const renderAppWithProviders = (initialState: any = {}) => {
  return (
    <Provider store={store(initialState)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

describe("Headers texts", () => {
  test("renders learn react link", () => {});
});
