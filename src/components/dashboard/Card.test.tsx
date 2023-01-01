import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import Card from "./Card";
import Windows1 from "../../images/windows1.jpeg";
import { MultiActionAreaCardProps } from "./Card";

const renderWithProps = (
  initialState: any = {},
  props: MultiActionAreaCardProps
) => {
  return (
    <Provider store={store(initialState)}>
      <BrowserRouter>
        <Card {...props} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Card", () => {
  test("should render title,decription, button", () => {
    render(
      renderWithProps(
        {},
        {
          image: Windows1,
          title: "Raise Ticket",
          description:
            "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
          buttonText: "Raise Ticket",
          buttonAction: () => {},
          path: "/ticket",
          name: "ticket",
        }
      )
    );
    const titleElement = screen.getAllByText("Raise Ticket", { exact: false });
    expect(titleElement).not.toHaveLength(0);
    const buttonElement = screen.getByRole("button", { name: "Raise Ticket" });
    expect(buttonElement).toBeInTheDocument();
  });
});
