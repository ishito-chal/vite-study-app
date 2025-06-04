import { calcTotalTime } from '../fetchStudy';
import { StudyRecordType } from '../../api/studyRecord';

describe('calcTotalTime', () => {
  it('sums time from StudyRecordType array', () => {
    const records: StudyRecordType[] = [
      { id: '1', title: 'a', time: 30 },
      { id: '2', title: 'b', time: 60 },
    ];
    const result = calcTotalTime(records);
    expect(result).toBe(90);
  });
});
