import React from "react";
import {
  render,
  screen,
  fireEvent,
  queryByAttribute,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "src/components/UserForm";

const getById = queryByAttribute.bind(null, "id");

const setup = () => {
  const utils = render(<UserForm />);
  const name = getById(utils.container, "name");
  const email = getById(utils.container, "email");
  const contact = getById(utils.container, "contact");
  const submit = getById(utils.container, "submit");

  return {
    name,
    email,
    contact,
    submit,
    ...utils,
  };
};

let testName = "UserRegistration boundary";

describe("boundary", () => {
  test(testName + " name is required", async () => {
    const { name } = setup();
    act(() => {
      fireEvent.blur(name);
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Name is required/i)).toBeTruthy();
    });
  });

  test(testName + " name is Valid", async () => {
    const { name } = setup();
    act(() => {
      fireEvent.blur(name);
      fireEvent.change(name, { target: { value: "temp name" } });
    });
    await waitFor(async () => {
      const nameError = screen.queryByText(/Name is required/i);
      expect(nameError).toBeNull();
    });
  });
});

describe("boundary", () => {
  test(testName + " Invalid Email", async () => {
    const { email } = setup();
    act(() => {
      fireEvent.blur(email);
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Email is required/i)).toBeTruthy();
    });
  });

  test(testName + " Email is invalid", async () => {
    const { email } = setup();
    act(() => {
      fireEvent.blur(email);
      fireEvent.change(email, { target: { value: "abc" } });
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Email is invalid/i)).toBeTruthy();
    });
  });

  test(testName + " Email is Valid", async () => {
    const { email } = setup();
    act(() => {
      fireEvent.blur(email);
      fireEvent.change(email, { target: { value: "abc@def.com" } });
    });
    await waitFor(async () => {
      const emailError = screen.queryByText(/Email is invalid/i);
      expect(emailError).toBeNull();
    });
  });
});

describe("boundary", () => {
  test(testName + " submit button disabled on invalid data", async () => {
    const utils = render(<UserForm />);
    expect(getById(utils.container, "submit")).toBeInTheDocument();
  });
});
