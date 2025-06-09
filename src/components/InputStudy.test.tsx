import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { InputStudy } from "./InputStudy";

test("タイトルが正しく表示されている", () => {
  render(<InputStudy />);

  // テキストが含まれている要素を探す
  const titleElement = screen.getByText("学習記録一覧");
  console.log(titleElement);
  // DOMに存在することを確認
  expect(titleElement).toBeInTheDocument();
});

test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている", async () => {
  render(<InputStudy />);

  // ロール 'textbox' を使ってテキストボックスを取得
  const inputGakuNaiyo = screen.getByRole("textbox", { name: "学習内容" });
  const inputGakuTime = screen.getByRole("spinbutton", { name: "学習時間" });
  const button = screen.getByRole("button", { name: "登録" });

  // 入力イベントをシミュレート
  fireEvent.change(inputGakuNaiyo, { target: { value: "学習内容テスト１" } });
  fireEvent.change(inputGakuTime, { target: { value: 11 } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getAllByText("学習内容テスト１")[0]).toBeInTheDocument();
    expect(screen.getAllByText("11")[0]).toBeInTheDocument();
  });
});

test("削除ボタンを押すと学習記録が削除される", async () => {
  render(<InputStudy />);

  let gakusyuNaiyoCountBefore = 0;
  let gakusyuTimeCountBefore = 0;
  await waitFor(() => {
    gakusyuNaiyoCountBefore = screen.getAllByText("学習内容テスト１").length;
    gakusyuTimeCountBefore = screen.getAllByText("11").length;
  });

  // ロール 'button' を使ってテキストボックスを取得
  const button = screen.getAllByRole("button", { name: "削除" });

  // 入力イベントをシミュレート
  fireEvent.click(button[0]);

  await waitFor(() => {
    const gakusyuNaiyoCountAfter =
      screen.getAllByText("学習内容テスト１").length;
    const gakusyuTimeCountAfter = screen.getAllByText("11").length;
    expect(gakusyuNaiyoCountBefore - gakusyuNaiyoCountAfter).toBe(1);
    expect(gakusyuTimeCountBefore - gakusyuTimeCountAfter).toBe(1);
  });
});

test("入力をしないで登録を押すとエラーが表示される", async () => {
  render(<InputStudy />);

  // ロール 'button' を使ってテキストボックスを取得
  const button = screen.getByRole("button", { name: "登録" });

  // 入力イベントをシミュレート
  fireEvent.click(button);

  await waitFor(() => {
    const label = screen.getByText("入力されていない項目があります");
    expect(label).toBeInTheDocument();
  });
});
