import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { Story } from "../components/Story";
import { singularStory } from "../fixtures";
import { getStory } from "../services/hnApi";

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock("../services/hnApi", () => ({
  getStory: jest.fn()
}));

test("renders the story component with content", async () => {
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  // getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  const { getByText, getByTestId, queryByTestId } = render(
    <Story storyId="1" />
  );
  await waitForElement(() => [
    expect(getByTestId("story")).toBeTruthy(),
    expect(getByText("Tarnished: Google Responds")).toBeTruthy(),
    // expect(getByTestId("story-by").textContent).toEqual("by: Karl Hadwen")
  ]);
});
