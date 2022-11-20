import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routesConfig";

test("test_title", async () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);
  expect(screen.getByText(/COURSE INFORMATION/i)).toBeInTheDocument();
});
