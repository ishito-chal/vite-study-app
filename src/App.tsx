import { useState } from "react";
import "./App.css";
import { InputStudy } from "./components/InputStudy";
import { StudyList } from "./components/StudyList";
import { StudyRecordType } from "./api/studyRecord";

function App() {
  const [studyRecords, setStudyRecords] = useState<StudyRecordType[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <InputStudy setLoading={setLoading} setStudyRecords={setStudyRecords} />
      <StudyList
        loading={loading}
        studyRecords={studyRecords}
        setStudyRecords={setStudyRecords}
      />
    </>
  );
}

export default App;
