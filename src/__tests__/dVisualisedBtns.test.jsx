import DStandingsVisualised from "../DriverStandingsVisualised/DStandingsVisualised";
import { expect, test } from "vitest";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { findAllByTestId, getByTestId, render } from "@testing-library/react";
import { vi } from "vitest";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

test("pie chart button fires on click", async () => {
  const pieTest = render(
    <QueryClientProvider client={queryClient}>
      <DStandingsVisualised />
    </QueryClientProvider>
  );

  const pieBtn = await pieTest.findByTestId("pieBtnTest");
  const spy = vi.spyOn(pieBtn, "click");
  pieBtn.click();

  expect(spy).toHaveBeenCalled();
  pieTest.unmount();
});

test("bar chart button fires on click", async () => {
  const barTest = render(
    <QueryClientProvider client={queryClient}>
      <DStandingsVisualised />
    </QueryClientProvider>
  );

  const barBtn = await barTest.findByTestId("testingChart");
  const spy2 = vi.spyOn(barBtn, "click");
  barBtn.click();

  expect(spy2).toHaveBeenCalled();
  barTest.unmount();
});
