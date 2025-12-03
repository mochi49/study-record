import { memo } from "react";

export const InputForm = memo((props) => {
  const { title, onChangeTitle, time, onChangeTime, onSubmit, isError } = props;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">学習内容</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={onChangeTitle}
          value={title}
        />
        <br />
        <label htmlFor="time">学習時間</label>
        <input
          type="number"
          name="time"
          id="time"
          onChange={onChangeTime}
          value={time}
        />
        時間
        <p style={{ margin: "0" }}>入力されている学習内容：{title}</p>
        <p style={{ margin: "0" }}>入力されている学習時間：{time}時間</p>
        <button>登録</button>
        {
          /* 入力されていない項目があった場合、ここにエラーメッセージを表示する */
          isError && (
            <p style={{ margin: "0" }}>入力されていない項目があります</p>
          )
        }
      </form>
    </div>
  );
});
