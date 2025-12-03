import { useEffect, useState } from "react";
import { InputForm } from "./components/InputForm";
import { TotalTime } from "./components/TotalTime";
import { supabase } from "./javascripts/supabaseClient";
import { RecordsList } from "./components/RecordsList";

const DB_NAME = "study-record";

const calcTotalTime = (records) => {
  let _totalTime = 0;
  records.forEach((record) => {
    _totalTime += record.time;
  });
  return _totalTime;
};

const App = () => {
  const [records, setRecords] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const { data, error } = await supabase.from(DB_NAME).select("*");

    if (data) {
      setRecords(data);
      setTotalTime(calcTotalTime(data));
      setIsLoading(false);
    }
  };

  const onChangeTitle = (e) => setNewTitle(e.target.value);
  const onChangeTime = (e) => setNewTime(e.target.value);

  const onClickDelete = async (id) => {
    setIsLoading(true);
    await supabase.from(DB_NAME).delete().eq("id", id);
    fetchRecords();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (newTitle === "" || newTime === "") {
      setIsError(true);
    } else {
      const newRecord = { title: newTitle, time: Number(newTime) };

      await supabase.from(DB_NAME).insert(newRecord);

      setNewTitle("");
      setNewTime("");
      setIsError(false);
    }
    fetchRecords();
  };

  return (
    <>
      <InputForm
        title={newTitle}
        onChangeTitle={onChangeTitle}
        time={newTime}
        onChangeTime={onChangeTime}
        onSubmit={onSubmit}
        isError={isError}
      />
      <RecordsList
        records={records}
        onClickDelete={onClickDelete}
        isLoading={isLoading}
      />
      <TotalTime totalTime={totalTime} />
    </>
  );
};

export default App;
