import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import Succeed from "./Succeed";
import Error from "./Error";

const ToastManager = () => {
  const { text, isSucceed, isError } = useSelector((state: RootState) => state.toast);

  return (
    <>
      {isSucceed && <Succeed text={text} />}
      {isError && <Error />}
    </>
  );
};

export default React.memo(ToastManager);
