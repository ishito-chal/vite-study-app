import { createSupabase } from "../utils/createSupabase";

const supabase = createSupabase;
const tableName = "study-record";

export type StudyRecordType = {
  id: string;
  title: string;
  time: number;
};

export const selectStudyRecord = async () => {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error) {
    console.error("Supabase fetch error:", error);
  }
  return data as StudyRecordType[];
};

export const insertStudyRecord = async (props: StudyRecordType) => {
  const { title, time } = props;
  const { error } = await supabase.from(tableName).insert({ title, time });

  if (error) {
    console.error("追加に失敗しました:", error);
    return false;
  }
  return true;
};

export const deleteStudyRecord = async (props: StudyRecordType) => {
  const { id } = props;
  const { error } = await supabase.from(tableName).delete().eq("id", id);

  if (error) {
    console.error("削除に失敗しました:", error);
    return false;
  }
  return true;
};
