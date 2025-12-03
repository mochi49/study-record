import { memo } from "react";

export const TotalTime = memo(({ totalTime }) => {
  return <p style={{ margin: "0" }}>合計時間：{totalTime}/1000(h)</p>;
});
