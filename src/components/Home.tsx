import { Button, Divider, Typography, Flex, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "./../styles/App.css";

const { Title, Paragraph } = Typography;

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-wrapper">
      <Flex gap={"middle"} vertical className="content-wrapper">
        <Title>Welcome to the Clock Application!</Title>
        <Divider />
        <Paragraph>
          This Application is basically a representation of a clock Home where
          you can use it as a stop watch, or a count down Application
        </Paragraph>
        <Divider />
        <Space>
          <Button
            color="purple"
            variant="filled"
            onClick={() => navigate("/count-down")}
          >
            Count Down
          </Button>
          <Button
            color="purple"
            variant="filled"
            onClick={() => navigate("/stop-watch")}
          >
            Stop Watch
          </Button>
        </Space>
      </Flex>
    </div>
  );
}

export default Home;
