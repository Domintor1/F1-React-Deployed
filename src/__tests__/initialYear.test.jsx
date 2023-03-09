import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import DriverList from "../DriverList/DriverList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

test("default year on filter is 2014", async () => {
  const driverList = render(
    <QueryClientProvider client={queryClient}>
      <DriverList />
    </QueryClientProvider>
  );
  const inputField = await driverList.findByTestId("defaultValTest");
  expect(inputField.value).toEqual("2014");
});
