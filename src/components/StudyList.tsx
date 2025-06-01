import { deleteStudyRecord, StudyRecordType } from "../api/studyRecord";

type StudyListType = {
  loading: boolean;
  studyRecords: StudyRecordType[];
  setStudyRecords: React.Dispatch<React.SetStateAction<StudyRecordType[]>>;
};

export const StudyList = (props: StudyListType) => {
  const { loading, studyRecords, setStudyRecords } = props;

  const onClickDelete = async (id: string) => {
    const result: boolean = await deleteStudyRecord({ id, title: "", time: 0 });
    if (result) {
      const newStudyRecords: StudyRecordType[] = studyRecords.filter(
        (data: StudyRecordType) => data.id !== id
      );
      setStudyRecords([...newStudyRecords]);
    }
  };
  return (
    <div>
      <h2>学習リスト</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        studyRecords.map((record: StudyRecordType) => {
          return (
            <div key={record.id} style={{ display: "flex" }}>
              <p>{record.title}</p>
              <p>{record.time}</p>
              <button onClick={() => onClickDelete(record.id)}>削除</button>
            </div>
          );
        })
      )}
    </div>
  );
};
