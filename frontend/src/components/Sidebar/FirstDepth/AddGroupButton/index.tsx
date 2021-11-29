import styled from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import { useDispatch } from "react-redux";
import { ModalAction } from "@src/action";
import { modal } from "@src/constants";
interface AddGroupButtonProps {
  addGroupBtnRef: React.RefObject<HTMLDivElement>;
}

const AddGroupButton = ({ addGroupBtnRef }: AddGroupButtonProps) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(ModalAction.openModalAction(modal.AddGroupModal));
  };
  return <ButtonWrapper onClick={clickHandler} ref={addGroupBtnRef} className="add-group-btn"></ButtonWrapper>;
};

const ButtonWrapper = styled.div`
  min-width: 3vw;
  min-height: 3vw;
  background: ${(props) => props.theme.PRIMARY};
  background-image: url("/icons/add-group.svg");
  ${flexRowCenterAlign}
  border: 1px solid  ${(props) => props.theme.SECONDARY};
  margin: 10%;
  padding: 10%;
  border-radius: 1vw;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
`;

export default AddGroupButton;
