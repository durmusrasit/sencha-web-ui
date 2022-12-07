import "./App.css";
import { appStyle, buttonStyle } from "./styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Theme } from "./utils/theme.class";

import { useEffect, useMemo, useState } from "react";

import { RunContext } from "./contexts/RunContext";
import { IInfoBox, InfoBoxContext } from "./contexts/InfoBoxContext";
import {
  ResponseProvider,
  useResponseContext,
} from "./contexts/ResponseContext";

import { InfoBox } from "./components/ui/InfoBox";

import { InputManager } from "./components/InputManager";

import BootLine from "./components/ui/BootLine";
import LineText from "./components/ui/LineText";
import OutputCorner from "./components/ui/OutputCorner";

let muiTheme = createTheme({
  palette: {
    primary: {
      main: "#FFF",
    },
    background: {
      default: "#000",
    },
  },
});

export interface IMainColor {
  background: string;
  foreground: string;
}

function App() {
  const theme = new Theme(useResponseContext);
  const themeColors = theme.getColors();

  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const [infoBox, setInfoBox] = useState<IInfoBox>({
    infoBoxType: 0,
    infoBoxText: "",
  });

  const [isInputOpen, setIsInputOpen] = useState(true);
  const [doubleClick, setDoubleClick] = useState(false);

  const runContext = useMemo(() => ({ isRunning, setIsRunning }), [isRunning]);
  const infoBoxContext = useMemo(() => ({ infoBox, setInfoBox }), [infoBox]);

  const updateColors = (data: IMainColor) => {
    muiTheme = createTheme({
      palette: {
        primary: {
          main: data.foreground ?? "#FFF",
        },
        background: {
          default: data.background ?? "#000",
        },
      },
    });
  };

  useEffect(() => {
    updateColors(themeColors);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [themeColors]);

  const handleKeyDown = (e: any) => {
    console.log("handleKeyDown e.code", e.code);
    if (e.code === "Escape") setIsInputOpen(true);
    if (e.altKey && e.code === "KeyI") setIsInputOpen((prev) => !prev);
  };

  const handleDoubleClick = (e: any) => {
    setDoubleClick(true);
  };

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {isLoading ? (
          <div style={appStyle.body}>
            <BootLine />
          </div>
        ) : (
          <RunContext.Provider value={runContext}>
            <ResponseProvider>
              <InfoBoxContext.Provider value={infoBoxContext}>
                <OutputCorner />
                {doubleClick && (
                  <div style={buttonStyle.container}>
                    <div
                      style={{
                        ...buttonStyle.buttonBox,
                        color: themeColors.background,
                        backgroundColor: themeColors.foreground,
                        border: `1px double ${themeColors.foreground}`,
                        borderStyle: "solid",
                        boxShadow: `2px 2px ${themeColors.foreground}`,
                        fontWeight: "bold",
                        fontFamily: "ald",
                      }}
                    >
                      doubleClick
                    </div>
                  </div>
                )}
                <div
                  style={appStyle.body}
                  onKeyDown={handleKeyDown}
                  onDoubleClick={handleDoubleClick}
                  tabIndex={-1}
                >
                  <InfoBox />
                  <LineText />
                </div>
                <InputManager isInputOpen={isInputOpen} />
              </InfoBoxContext.Provider>
            </ResponseProvider>
          </RunContext.Provider>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
