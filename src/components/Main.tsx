import { useContext, useEffect, useState } from "react";

import { RunContext } from "../contexts/RunContext";
import { useRespondContext } from "../contexts/RespondContext";

import { getTextWidth } from "../utils/functions";
import { useRecursiveTimeout } from "../utils/hooks";

import Line from './ui/Line';
import Text from './ui/Text';

type RespondContextType = {
    [key: string]: any;
}

const Main = () => {
    const { isRunning, setIsRunning } = useContext(RunContext);
    const respondContext: RespondContextType = useRespondContext();
    
    const [words, setWordArray] = useState<string[]>([]);
    const [word, setWord] = useState('');
    const [wordWidth, setWordWidth] = useState(28);
    const [wordIndex, setWordIndex] = useState(0);
    const [wordTimeout, setWordTimeout] = useState(500);

    useEffect(() => {
        if (isRunning) {
            setIsRunning(false);
            setWordArray(respondContext.respondState.respondText.split(" "));
            setWordIndex(0);
        }
    }, [isRunning])

    useEffect(() => {
        if (word === undefined) setWord('');
        setWordWidth(getTextWidth(word, "reem"));
    }, [word]);

    useRecursiveTimeout(
        () =>
            new Promise<void>((r) => {
                if (wordIndex <= words.length) {
                    if (wordIndex === 0 || wordIndex === words.length-1)
                        setWordTimeout(1000);
                    else setWordTimeout(500);

                    setWord(words[wordIndex]);
                    setWordIndex(wordIndex + 1);
                }
                r();
            }),
        wordTimeout, 0
    );

    return (
    <>
        <Text word={word} />
        <Line textWord={word} lineSize={wordWidth ? wordWidth * 3 + 10 : 28} />
    </>
    )
}

export default Main;