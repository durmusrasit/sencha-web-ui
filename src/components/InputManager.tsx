import { appStyle } from "../styles";
import { useEffect, useMemo, useState } from "react";

import { InputContext } from "../contexts/InputContext";
import {
  ResponseProvider,
  useResponseContext,
} from "../contexts/ResponseContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { CommandContext } from "../contexts/CommandContext";

import AngleUp from "./ui/AngleUp";
import TextInput from "./TextInput";
import TerminalInput from "./TerminalInput";

import { CommandRegistry } from "../commands/CommandRegistry";

import { AnyContextType, InputContextType } from "../types";

export const InputManager = ({ isInputOpen }: { isInputOpen: boolean }) => {
  CommandRegistry.registerAllCommands();

  const mainColorContext: AnyContextType = useThemeContext();
  const responseContext: AnyContextType = useResponseContext();

  const { mainColor } = mainColorContext;
  const { setResponseState } = responseContext;

  // Create state variables for inputEnabled and inputValue
  const [inputState, setInputState] = useState<InputContextType>({
    inputEnabled: true,
    inputValue: "",
  });

  // The setInputState in useEffect is executed by changing the value of the isInputOpen variable that comes as an prop from the App.tsx file with the trigger of the keyboard keys.
  useEffect(() => {
    // The setInputState function assigns the value isInputOpen to the inputEnabled value in the inputState object and sets the inputValue an empty string.
    setInputState({ inputEnabled: isInputOpen, inputValue: "" });
  }, [isInputOpen]);

  const inputContext = useMemo(
    () => ({
      inputState,
      setInputState,
    }),
    [inputState]
  );

  const { foreground } = mainColor;

  const runCommand = (cmdString: string) => {
    let splitCmdString = cmdString.split(" ");
    let commandName: any = splitCmdString.shift();
    let args = splitCmdString.join(" ");

    let lineText: string = "",
      outputText: string[] = [];

    if (commandName.startsWith("/")) {
      commandName = commandName.slice(1);

      let command = CommandRegistry.getCommand(commandName);
      if (command) {
        command.execute(args);
        return;
      }

      setResponseState({
        lineText: " " + lineText.toUpperCase(),
        outputText: outputText,
      });
    }
  };

  const commandContextValue = useMemo(() => ({ runCommand }), []);

  return (
    <InputContext.Provider value={inputContext}>
      <CommandContext.Provider value={commandContextValue}>
        <ResponseProvider>
          <div style={appStyle.body}>
            <div
              style={{
                position: "absolute",
                bottom: inputState.inputEnabled ? "32px" : "80px",
                transition: "height 0.3s ease-in-out, bottom 0.3s ease-in-out",
                transform: !inputState.inputEnabled ? "rotateX(180deg)" : "",
              }}
              onClick={() => {
                setInputState({
                  inputEnabled: !inputState.inputEnabled,
                  inputValue: "",
                });
              }}
            >
              <AngleUp foregroundColor={foreground} />
            </div>
            {true ? <TextInput /> : <TerminalInput />}
          </div>
        </ResponseProvider>
      </CommandContext.Provider>
    </InputContext.Provider>
  );
};
