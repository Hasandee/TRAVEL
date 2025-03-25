import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../client/src/Auth/Register";
import { BrowserRouter } from "react-router-dom";

jest.mock("../Hooks/userSignup", () => ({
  default: () => ({
    loading: false,
    error: null,
    registerUser: jest.fn(),
  }),
}));

describe("Register Component", () => {
  test("renders the registration form correctly", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByText("Create an Account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Your Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Your Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Your Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Re-enter Your Password")).toBeInTheDocument();
  });

  test("validates required fields", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Create Account"));

    expect(await screen.findByText("Please input your full name!")).toBeInTheDocument();
    expect(await screen.findByText("Please input your email!")).toBeInTheDocument();
    expect(await screen.findByText("Please input your password!")).toBeInTheDocument();
    expect(await screen.findByText("Please confirm your password!")).toBeInTheDocument();
  });
});
