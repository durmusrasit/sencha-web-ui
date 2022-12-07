import { useTheme } from "@mui/material";
import { FC } from "react";

import { mainStyle } from "../../../styles";

interface Props {
  textWord: string;
  lineSize: number;
}

const Line: FC<Props> = (props) => {
  const theme = useTheme();
  mainStyle.line.width = props.lineSize;

  return (
    <div
      className={`${props.textWord ? "" : "lineAnimation"}`}
      style={{
        ...mainStyle.line,
        color: theme.palette.primary.main,
        borderTop: `3.2px solid ${theme.palette.primary.main}`,
        transitionDuration: props.textWord ? "0.1s" : "200ms",
      }}
    />
  );
};

export default Line;
