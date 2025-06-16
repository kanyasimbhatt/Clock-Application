import { Flex, Input, type GetProps, Typography, Button, Space } from "antd";
import "./../styles/App.css";
import { useRef, useState } from "react";

type OTPProps = GetProps<typeof Input.OTP>;

const { Title, Paragraph } = Typography;
const Timer = () => {
  const [status, setStatus] = useState({ isStart: false, isPause: false });
  const [error, setError] = useState("");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const inputValue = useRef("");
  const hourRef = useRef<NodeJS.Timeout>(null);
  const minuteRef = useRef<NodeJS.Timeout>(null);
  const secondRef = useRef<NodeJS.Timeout>(null);

  const sharedProps: OTPProps = {
    onChange: (value: string) => {
      inputValue.current = value;
      const timings = inputValue.current.split("");
      const hourValue = `${timings[0]}${timings[1]}`;
      const minuteValue = `${timings[2]}${timings[3]}`;
      const secondValue = `${timings[4]}${timings[5]}`;
      setHours(hourValue);
      setMinutes(minuteValue);
      setSeconds(secondValue);
    },
  };

  const startSecondsTimer = () => {
    secondRef.current = setInterval(() => {
      setSeconds((second: string) => {
        if (second === "00") {
          if (+minutes >= 1) {
            startMinutesTimer();
            return "59";
          }
          clearInterval(secondRef.current!);
          return "00";
        }
        const value = +second - 1;
        if (value < 10) {
          return `0${value}`;
        }
        return `${value}`;
      });
    }, 1000);
  };

  const startMinutesTimer = () => {
    minuteRef.current = setInterval(() => {
      setMinutes((minute: string) => {
        if (minute === "00") {
          if (+hours >= 1) {
            startHourTimer();
            return "59";
          }
          clearInterval(minuteRef.current!);
          return "00";
        }
        const value = +minute - 1;

        if (value < 10) return `0${value}`;
        return `${value}`;
      });
    }, 60000);
  };

  const startHourTimer = () => {
    hourRef.current = setInterval(() => {
      setHours((hour: string) => {
        if (hour === "00") {
          clearInterval(hourRef.current!);
          return "00";
        }
        const value = +hour - 1;
        if (value < 10) return `0${value}`;
        return `${value}`;
      });
    }, 3600000);
  };

  const formatterFunc = (str: string) => {
    if (str.includes("0")) return str;
    return Number(str) ? str : "";
  };

  const handleStartTimer = () => {
    if (inputValue.current.length !== 6 || !+inputValue.current) {
      inputValue.current = "";
      setError("Enter the timer value");
      return;
    }

    if (+minutes > 59 || +seconds > 59) {
      inputValue.current = "";
      setError("The value of minutes and second should not exceed 60");
      return;
    }

    setStatus({ isStart: true, isPause: false });
    setError("");
    startSecondsTimer();
  };

  const handlePauseTimer = () => {
    setStatus({ isStart: false, isPause: true });

    clearInterval(hourRef.current!);
    clearInterval(minuteRef.current!);
    clearInterval(secondRef.current!);
  };
  const handleResetTimer = () => {};
  const handleRestartTimer = () => {};
  return (
    <div className="stop-watch-wrapper">
      <Flex gap={"middle"} vertical className="content-wrapper">
        <Title level={5}>Count Down</Title>

        <Input.OTP
          value={
            status.isStart || status.isPause
              ? `${hours}${minutes}${seconds}`
              : ""
          }
          length={6}
          formatter={(str: string) => formatterFunc(str)}
          {...sharedProps}
          disabled={status.isStart || status.isPause}
        />

        {error ? <Paragraph type="danger">{error}</Paragraph> : ""}

        <Space size="large">
          <Button
            type="default"
            color="purple"
            variant="filled"
            onClick={handleStartTimer}
            disabled={status.isStart}
          >
            Set
          </Button>
          <Button
            type="default"
            color="purple"
            variant="filled"
            onClick={handlePauseTimer}
            disabled={status.isPause}
          >
            Pause
          </Button>
          <Button
            type="default"
            color="purple"
            variant="filled"
            onClick={handleResetTimer}
          >
            Reset
          </Button>
          <Button
            type="default"
            color="purple"
            variant="filled"
            onClick={handleRestartTimer}
          >
            Restart
          </Button>
        </Space>
      </Flex>
    </div>
  );
};

export default Timer;
