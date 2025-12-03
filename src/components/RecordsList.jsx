import { memo } from "react";

export const RecordsList = memo((props) => {
  const { records, onClickDelete, isLoading } = props;

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {records.map((rec) => (
            <li key={rec.id}>
              {rec.title} - {rec.time}h{" "}
              <button onClick={() => onClickDelete(rec.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
