import { Button, Flex, Space, Typography } from "antd";
import { useRef, useState } from "react";
import "./../styles/App.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Timer = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [milliseconds, setMilliseconds] = useState("00");
  const [disableStart, setDisableStart] = useState(false);
  const navigate = useNavigate();

  const hourRef = useRef<NodeJS.Timeout>(null);
  const minuteRef = useRef<NodeJS.Timeout>(null);
  const secondRef = useRef<NodeJS.Timeout>(null);
  const millisecondRef = useRef<NodeJS.Timeout>(null);

  const handleStartCounter = () => {
    setDisableStart(true);
    hourRef.current = setInterval(() => {
      if (+hours >= 9) setHours((hours) => `${+hours + 1}`);
      else setHours((hours) => `0${+hours + 1}`);
    }, 3600000);

    minuteRef.current = setInterval(() => {
      setMinutes((minutes) => {
        if (+minutes >= 60) return `00`;
        else {
          if (+minutes >= 9) return `${+minutes + 1}`;
          return `0${+minutes + 1}`;
        }
      });
    }, 60000);

    secondRef.current = setInterval(() => {
      setSeconds((seconds) => {
        if (+seconds >= 60) return `00`;
        else {
          if (+seconds >= 9) return `${+seconds + 1}`;
          return `0${+seconds + 1}`;
        }
      });
    }, 1000);

    millisecondRef.current = setInterval(() => {
      setMilliseconds((milliseconds) => {
        if (+milliseconds >= 98) return `00`;
        else {
          if (+milliseconds >= 9) return `${+milliseconds + 1}`;
          return `0${+milliseconds + 1}`;
        }
      });
    }, 10);
  };

  const handleStopCounter = () => {
    setDisableStart(false);

    clearInterval(hourRef.current!);
    clearInterval(minuteRef.current!);
    clearInterval(secondRef.current!);
    clearInterval(millisecondRef.current!);
  };

  const handleGoBack = () => {
    handleStopCounter();
    navigate("/");
  };

  return (
    <div className="stop-watch-wrapper">
      <Flex gap={"large"} vertical className="content-wrapper">
        <Title>Stop Watch</Title>
        <Flex gap={"middle"}>
          <div className="text-wrapper">
            <Title>{hours}</Title>
          </div>
          <Title>:</Title>
          <div className="text-wrapper">
            <Title>{minutes}</Title>
          </div>
          <Title>:</Title>
          <div className="text-wrapper">
            <Title>{seconds}</Title>
          </div>
          <Title>:</Title>
          <div className="text-wrapper">
            <Title>{milliseconds}</Title>
          </div>
        </Flex>
        <Space size={"large"}>
          <Button
            type="default"
            color="purple"
            variant="filled"
            onClick={handleStartCounter}
            value={"large"}
            disabled={disableStart}
          >
            Start
          </Button>
          <Button
            type="default"
            color="purple"
            variant="filled"
            value={"large"}
            onClick={handleStopCounter}
            disabled={!disableStart}
          >
            Stop
          </Button>
        </Space>
        <Button
          type="default"
          color="purple"
          variant="filled"
          value={"large"}
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      </Flex>
    </div>
  );
};

export default Timer;
