import { useTheme } from "@mui/material";
import { FC } from "react";

import { appStyle } from "../../styles";
import { calculateColorBrightness } from "../../utils/functions";

const BootLine: FC<{}> = () => {
  const theme = useTheme();

  let backgroundColor = theme.palette.background.default;

  let bootLineColor = calculateColorBrightness(backgroundColor) || "#FFFFFF";

  return (
    <div
      className="bootLineAnimation"
      style={{
        ...appStyle.bootLine,
        background: bootLineColor,
        borderLeft: `3px solid ${bootLineColor}`,
      }}
    />
  );
};

export default BootLine;
