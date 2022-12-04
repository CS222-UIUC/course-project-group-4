import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routesConfig";

test("test route", async () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);
  expect(screen.getByText(/COURSE INFORMATION/i)).toBeInTheDocument();
});

test("test course info path", async() => {
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ["/courseinfo"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/COURSE INFO/i)).toBeInTheDocument();
})

test("test course info subject/num path", async() => {
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ["/courseinfo/ECE/120"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/ECE/i)).toBeInTheDocument();
    expect(screen.getByText(/120/i)).toBeInTheDocument();
})

test("test invalid path", async() => {
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ["/wrongdata"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
})








