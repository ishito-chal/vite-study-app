import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { InputStudy } from "./InputStudy";
import { StudyRecordType } from "../api/studyRecord";
import { StudyList, StudyListType } from "./StudyList";

test("タイトルが正しく表示されている", () => {
  render(<InputStudy />);

  // テキストが含まれている要素を探す
  const titleElement = screen.getByText("学習記録一覧");
  console.log(titleElement);
  // DOMに存在することを確認
  expect(titleElement).toBeInTheDocument();
});

test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている（入力）", async () => {
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
    expect(screen.getByText("登録に成功しました")).toBeInTheDocument();
  });
});

test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている（登録）", async () => {
  const studyRecords: StudyRecordType[] = [
    { id: "1", title: "test1", time: 1 },
    { id: "2", title: "test2", time: 2 },
  ];
  const studyListProps: StudyListType = {
    loading: false,
    studyRecords: studyRecords,
    setStudyRecords: () => studyRecords,
  };
  render(
    <StudyList
      loading={studyListProps.loading}
      studyRecords={studyListProps.studyRecords}
      setStudyRecords={studyListProps.setStudyRecords}
    />
  );

  // テキストが含まれている要素を探す
  const titleElement = await screen.getByText("学習内容テスト１");
  const timeElement = await screen.getByText("11");
  // DOMに存在することを確認
  expect(titleElement).toBeInTheDocument();
  expect(timeElement).toBeInTheDocument();
});
