import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const Main = () => {
  const [isToggle, setIsToggle] = useState<boolean>(true);

  return (
    <>
      <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} />
    </>
  );
};

export default Main;
