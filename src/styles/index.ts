import { CSSProperties } from "react";

const appStyle: { [key: string]: CSSProperties } = {
  body: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1",
  },
  bootLine: {
    position: "fixed",
    height: "100%",
    marginBottom: "16px",
  },
};

export const outputCornerStyle: { [key: string]: CSSProperties } = {
  container: {
    position: "absolute",
    top: "10px",
    left: "10px",
    display: "flex",
    whiteSpace: "pre-line",
  },
  text: {
    fontFamily: "Source Code Pro",
    fontSize: "16px",
    padding: "2px 4px",
    marginLeft: "8px",
    transition: "background 500ms linear",
  },
};

const buttonStyle: { [key: string]: CSSProperties } = {
  container: {
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
  },
  buttonBox: {
    fontFamily: "Source Code Pro",
    fontSize: "16px",
    padding: "2px 4px",
    marginLeft: "8px",
    cursor: "default",
    userSelect: "none",
    transition: "background 500ms linear",
  },
};

const infoBoxStyle: { [key: string]: CSSProperties } = {
  container: {
    position: "absolute",
    marginBottom: "256px",
    width: "342px",
    maxWidth: "342",
    padding: "5px 15px",
    cursor: "default",
    userSelect: "none",
    whiteSpace: "pre-line",
    transition: "opacity 0.5s ease-in-out",
    transitionDuration: "200ms",
  },
  timerTextStyle: {
    fontSize: "18px",
    fontFamily: "Source Code Pro",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  infoTextStyle: {
    fontSize: "18px",
    fontFamily: "Source Code Pro",
    textAlign: "left",
  },
};

const mainStyle: { [key: string]: CSSProperties } = {
  line: {
    marginTop: "2.4em",
    width: "28px",
    transitionProperty: "width",
    transitionTimingFunction: "linear",
    userSelect: "none",
  },
  text: {
    position: "absolute",
    textAlign: "center",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    fontFamily: "reem",
    fontSize: "28px",
    userSelect: "none",
  },
};

export { appStyle, buttonStyle, infoBoxStyle, mainStyle };
