import { render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("SearchBar", () => {
  it("renders search bar with input and button", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = screen.getByPlaceholderText(
      "Enter repo URL. Example: https://github.com/facebook/react"
    );
    const button = screen.getByRole("button", { name: "Load" });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
