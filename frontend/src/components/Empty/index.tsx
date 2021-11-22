import { useDispatch } from "react-redux";
const Empty = () => {
  const dispatch = useDispatch();
  const onClickCreateGroupBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: "OPEN_MODAL", payload: "CreateGroupModal" });
  };

  const onClickJoinGroupBtn = () => {
    dispatch({ type: "OPEN_MODAL", payload: "JoinGroupModal" });
  };

  return (
    <>
      <button onClick={onClickCreateGroupBtn}>그룹 생성</button>
      <button onClick={onClickJoinGroupBtn}>그룹 참가</button>
    </>
  );
};

export default Empty;
