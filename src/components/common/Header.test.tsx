import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./Header";
import store from "../../store";

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
  test("renders learn react link", () => {
    render(renderAppWithProviders({}));
    const headerElement = screen.getByText("Computeronics", { exact: false });
    expect(headerElement).toBeInTheDocument();
  });
  test("renders login button when there is no user in redux", () => {
    render(renderAppWithProviders({}));
    const loginElement = screen.getByRole("button", { name: "Login" });
    expect(loginElement).toBeInTheDocument();
  });
  test("renders logout button when there is a user in redux", () => {
    render(
      renderAppWithProviders({
        user: {
          data: {
            _id: 123,
          },
        },
      })
    );
    const loginElement = screen.getByRole("button", { name: "Logout" });
    expect(loginElement).toBeInTheDocument();
  });
});
