import { Flex, Input, type GetProps, Typography, Button, Space } from "antd";
import "./../styles/App.css";
import { useRef, useState, useEffect } from "react";

type OTPProps = GetProps<typeof Input.OTP>;
const { Title, Paragraph } = Typography;

const Timer = () => {
  const [status, setStatus] = useState({ isStart: false, isPause: false });
  const [error, setError] = useState("");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [totalSeconds, setTotalSeconds] = useState(0);

  const inputValue = useRef("");
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const sharedProps: OTPProps = {
    onChange: (value: string) => {
      inputValue.current = value;
      if (value.length === 6) {
        const hr = `${value[0]}${value[1]}`;
        const min = `${value[2]}${value[3]}`;
        const sec = `${value[4]}${value[5]}`;
        setHours(hr);
        setMinutes(min);
        setSeconds(sec);
      }
    },
  };

  useEffect(() => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    setHours(hrs.toString().padStart(2, "0"));
    setMinutes(mins.toString().padStart(2, "0"));
    setSeconds(secs.toString().padStart(2, "0"));
    if (totalSeconds === 0 && status.isStart) {
      clearInterval(countdownRef.current!);
      setStatus({ isStart: false, isPause: false });
    }
  }, [totalSeconds, status.isStart]);

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

    const hr = parseInt(inputValue.current.slice(0, 2), 10);
    const min = parseInt(inputValue.current.slice(2, 4), 10);
    const sec = parseInt(inputValue.current.slice(4, 6), 10);

    if (min > 59 || sec > 59) {
      inputValue.current = "";
      setError("Minutes and seconds should not exceed 59");
      return;
    }

    const secondsTotal = hr * 3600 + min * 60 + sec;
    if (secondsTotal === 0) {
      setError("Timer must be greater than 0");
      return;
    }
    setError("");
    setTotalSeconds(secondsTotal);
    setStatus({ isStart: true, isPause: false });

    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setTotalSeconds((prev) => prev - 1);
    }, 1000);
  };

  const handlePauseTimer = () => {
    setStatus({ isStart: false, isPause: true });
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  const handleResetTimer = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setTotalSeconds(0);
    setHours("00");
    setMinutes("00");
    setSeconds("00");
    setStatus({ isStart: false, isPause: false });
    inputValue.current = "";
    setError("");
  };

  const handleRestartTimer = () => {
    if (totalSeconds > 0 && status.isPause) {
      setStatus({ isStart: true, isPause: false });
      countdownRef.current = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    }
  };

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
          formatter={formatterFunc}
          {...sharedProps}
          disabled={status.isStart || status.isPause}
        />

        {error && <Paragraph type="danger">{error}</Paragraph>}

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
            disabled={!status.isStart}
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
