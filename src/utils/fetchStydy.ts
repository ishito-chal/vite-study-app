import { selectStudyRecord, StudyRecordType } from "../api/studyRecord";

type FetchDataType = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setStudyRecords: React.Dispatch<React.SetStateAction<StudyRecordType[]>>;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;
};

export const fetchStudy = async (props: FetchDataType) => {
  const { setLoading, setStudyRecords, setTotalTime } = props;
  setLoading(true);
  const fetchData: StudyRecordType[] = await selectStudyRecord();
  if (fetchData === null) {
    return;
  }
  setStudyRecords(fetchData);
  setTotalTime(calcTotalTime(fetchData));

  setLoading(false);
};

const calcTotalTime = (fetchData: StudyRecordType[]) => {
  const totalTime: number = fetchData.reduce((sum, data) => sum + data.time, 0);
  return totalTime;
};
