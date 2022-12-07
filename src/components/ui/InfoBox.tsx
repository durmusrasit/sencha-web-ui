import { useContext, FC } from "react";

import { infoBoxStyle } from "../../styles";

import { InfoBoxContext } from "../../contexts/InfoBoxContext";

import Typewriter from "typewriter-effect";

import { AnyContextType } from "../../types";
import { useTheme } from "@mui/material";

export const InfoBox: FC<{}> = ({}) => {
  const theme = useTheme();

  const infoBoxContext: AnyContextType = useContext(InfoBoxContext);

  const background = theme.palette.background.default;
  const foreground = theme.palette.primary.main;

  const { infoBox } = infoBoxContext;

  const { infoBoxText, infoBoxType } = infoBox;

  const transparentBackground = infoBoxType === 3 ? false : true;
  const textColor = transparentBackground ? foreground : background;

  return (
    <div
      style={
        transparentBackground
          ? {
              ...infoBoxStyle.container,
              backgroundColor: "transparent",
              opacity: !infoBoxText ? 0 : 1,
            }
          : {
              ...infoBoxStyle.container,
              backgroundColor: foreground,
              borderTop: `2px solid ${foreground}`,
              borderBottom: `2px solid ${foreground}`,
              opacity: !infoBoxText ? 0 : 1,
            }
      }
    >
      {infoBoxType === 0 ? (
        <div
          style={{
            ...infoBoxStyle.infoTextStyle,
            color: textColor,
          }}
        >
          <Typewriter
            options={{
              strings: infoBoxText,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            ...infoBoxStyle.timerTextStyle,
            color: textColor,
          }}
        >
          {infoBoxText}
        </div>
      )}
    </div>
  );
};
