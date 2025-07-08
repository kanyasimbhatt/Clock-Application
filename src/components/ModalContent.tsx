import { Button, Space } from "antd";

type ModalContentProps = {
  onClose: () => void;
  stopAlarm: (id?: string) => void;
  handleRepeat: () => void;
};

const ModalContent = ({
  onClose,
  stopAlarm,
  handleRepeat,
}: ModalContentProps) => {
  const handleClickOnStop = () => {
    onClose();
    stopAlarm();
  };
  return (
    <div className="modal">
      <h2>Time's Up</h2>
      <Space size={"large"}>
        <Button
          type="default"
          color="purple"
          variant="filled"
          value={"large"}
          onClick={handleClickOnStop}
        >
          Stop
        </Button>
        <Button
          type="default"
          color="purple"
          variant="filled"
          value={"large"}
          onClick={handleRepeat}
        >
          Repeat
        </Button>
      </Space>
    </div>
  );
};

export default ModalContent;
