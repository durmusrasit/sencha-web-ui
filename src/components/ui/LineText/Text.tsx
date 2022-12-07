import { useTheme } from "@mui/material";
import { FC } from "react";

import { mainStyle } from "../../../styles";

interface Props {
  word: string;
}

const Text: FC<Props> = (props) => {
  const theme = useTheme();
  return (
    <div style={{ ...mainStyle.text, color: theme.palette.primary.main }}>
      {props.word}
    </div>
  );
};

export default Text;
