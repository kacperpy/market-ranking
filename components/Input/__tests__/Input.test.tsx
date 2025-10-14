import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Input } from "../Input";

describe("Input", () => {
  const defaultProps = {
    label: "Test Label",
    placeholder: "Test Placeholder",
    value: "",
    onChangeText: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onChangeText.mockClear();
  });

  it("renders label correctly", () => {
    const { getByText } = render(<Input {...defaultProps} />);
    expect(getByText("Test Label")).toBeTruthy();
  });

  it("renders placeholder correctly", () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} />);
    expect(getByPlaceholderText("Test Placeholder")).toBeTruthy();
  });

  it("displays the provided value", () => {
    const props = {
      ...defaultProps,
      value: "Test Value",
    };
    const { getByDisplayValue } = render(<Input {...props} />);
    expect(getByDisplayValue("Test Value")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} />);
    const input = getByPlaceholderText("Test Placeholder");

    fireEvent.changeText(input, "New Value");
    expect(defaultProps.onChangeText).toHaveBeenCalledWith("New Value");
  });

  it("applies focused styles when focused", () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} />);
    const input = getByPlaceholderText("Test Placeholder");

    fireEvent(input, "focus");
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: "#eb9525ff" }),
      ])
    );

    fireEvent(input, "blur");
    expect(input.props.style).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ borderColor: "#eb9525ff" }),
      ])
    );
  });
});
