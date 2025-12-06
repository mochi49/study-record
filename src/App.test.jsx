import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const mockSelect = jest.fn();
const mockInsert = jest.fn();
const mockDeleteEq = jest.fn();
const mockDelete = jest.fn(() => ({ eq: mockDeleteEq }));
const mockFrom = jest.fn(() => ({
  select: mockSelect,
  insert: mockInsert,
  delete: mockDelete,
}));

jest.mock("./javascripts/supabaseClient", () => ({
  supabase: {
    from: (...args) => mockFrom(...args),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockSelect.mockResolvedValue({ data: [] });
  mockInsert.mockResolvedValue({});
  mockDeleteEq.mockResolvedValue({});
});

test("タイトルが表示されている", async () => {
  render(<App />);

  expect(await screen.findByText(/合計時間/)).toBeInTheDocument();
});

test("フォームに学習内容と時間を入力して登録ボタンを押すと、新たに記録が追加される", async () => {
  mockSelect
    .mockResolvedValueOnce({ data: [] })
    .mockResolvedValueOnce({
      data: [{ id: 1, title: "React", time: 2 }],
    });

  render(<App />);
  const user = userEvent.setup();

  await waitFor(() => expect(mockSelect).toHaveBeenCalled());

  await user.type(screen.getByLabelText("学習内容"), "React");
  await user.type(screen.getByLabelText("学習時間"), "2");
  await user.click(screen.getByRole("button", { name: "登録" }));

  expect(mockInsert).toHaveBeenCalledWith({ title: "React", time: 2 });
  expect(await screen.findByText(/React - 2h/)).toBeInTheDocument();
});

test("削除ボタンを押すと記録が削除される", async () => {
  const record = { id: 1, title: "React", time: 2 };
  mockSelect
    .mockResolvedValueOnce({ data: [record] })
    .mockResolvedValueOnce({ data: [] });

  render(<App />);
  const user = userEvent.setup();

  expect(await screen.findByText(/React - 2h/)).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "削除" }));

  await waitFor(() =>
    expect(screen.queryByText(/React - 2h/)).not.toBeInTheDocument()
  );
  expect(mockDeleteEq).toHaveBeenCalledWith("id", record.id);
});

test("入力せずに登録を押すとエラーが表示される", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() => expect(mockSelect).toHaveBeenCalled());

  await user.click(screen.getByRole("button", { name: "登録" }));

  expect(
    await screen.findByText("入力されていない項目があります")
  ).toBeInTheDocument();
});
