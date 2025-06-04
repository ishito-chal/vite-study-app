import React from "react";
import { useEffect, useState } from "react";
import { insertStudyRecord, StudyRecordType } from "../api/studyRecord";
import { fetchStudy } from "../utils/fetchStydy";
import { StudyList } from "./StudyList";

export const InputStudy = () => {
  const [studyRecords, setStudyRecords] = useState<StudyRecordType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const styleFlex = {
    display: "flex",
    alignItems: "center",
  };

  const [newRecord, setNewRecord] = useState<StudyRecordType>({
    id: "",
    title: "",
    time: 0,
  });

  const onChangeGakusyuNaiyo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({ id: "", title: e.target.value, time: newRecord.time });
  };

  const onChangeGakusyuTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({
      id: "",
      title: newRecord.title,
      time: Number(e.target.value),
    });
  };

  const addRecord = async () => {
    return await insertStudyRecord(newRecord);
  };

  const [totalTime, setTotalTime] = useState<number>(0);
  const onClickTouroku = async () => {
    if (newRecord.title === "" || newRecord.time === 0) {
      return;
    }

    const result = await addRecord();
    if (result) {
      fetchStudy({ setLoading, setStudyRecords, setTotalTime });

      setNewRecord({ id: "", title: "", time: 0 });

      setShowMessage(true);
    }
  };

  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (newRecord.title === "" || newRecord.time === 0) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [newRecord.title, newRecord.time]);

  useEffect(() => {
    fetchStudy({ setLoading, setStudyRecords, setTotalTime });
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <>
      <h1>学習記録一覧</h1>
      <div style={styleFlex}>
        <label htmlFor="GakusyuNaiyo">学習内容</label>
        <input
          id="GakusyuNaiyo"
          type="text"
          value={newRecord.title}
          onChange={onChangeGakusyuNaiyo}
        />
      </div>
      <div style={styleFlex}>
        <label htmlFor="GakusyuTime">学習時間</label>
        <input
          id="GakusyuTime"
          type="number"
          value={newRecord.time}
          onChange={onChangeGakusyuTime}
        />
        <p>時間</p>
      </div>
      <p>入力されている学習内容:{newRecord.title}</p>
      <p>入力されている時間:{newRecord.time}時間</p>
      <div style={{ display: "flex" }}>
        <button id="Touroku" onClick={onClickTouroku}>
          登録
        </button>
        {showMessage && <p>登録に成功しました</p>}
      </div>
      {validation && <p>入力されていない項目があります</p>}
      <p>合計時間：{totalTime}/1000(h)</p>
      <StudyList
        loading={loading}
        studyRecords={studyRecords}
        setStudyRecords={setStudyRecords}
      />
    </>
  );
};
