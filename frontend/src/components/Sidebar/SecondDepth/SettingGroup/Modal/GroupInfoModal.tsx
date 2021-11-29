import React, { useState, Dispatch, SetStateAction } from "react";
import styled, { keyframes } from "styled-components";
import { flexColumnCenterAlign, flexRowCenterAlign } from "@src/styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch, useSelector } from "react-redux";
import COLOR from "@styles/Color";
import { RootState } from "@src/reducer";
import { GroupAction, ToastAction, ModalAction } from "@src/action";
import { FcInspection } from "react-icons/fc";
import { icon, toastMessage } from "@src/constants";

interface SettingGroupModalProps {
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const GroupInfoModal = ({ setIsToggle }: SettingGroupModalProps) => {
  const [clickedDropBtn, setClickedDropclickedDropBtn] = useState(false);
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const onClickDropBtn = () => {
    setClickedDropclickedDropBtn(true);
  };
  const onClickConfirmBtn = () => {
    const { groupId, groupName } = selectedGroup;

    dispatch(GroupAction.deleteGroupAction({ groupId, groupName }));
    closeModal();
    setIsToggle(false);
  };

  const onClickCancelBtn = () => {
    setClickedDropclickedDropBtn(false);
  };

  const clickGroupCode = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.target) return;
    navigator.clipboard.writeText((e.target as HTMLElement).innerText);
    dispatch(ToastAction.setSucceedToastAction({ text: toastMessage.clipboardSuccess }));
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <TitleWrapper>그룹 정보</TitleWrapper>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src={icon.clear} alt="clear icon" />
            </button>
          </CloseBtn>
        </Header>
        <Content>
          <GridItem>
            <GroupMemberListGuide>그룹원</GroupMemberListGuide>
            <GroupMemberListWrapper>
              <GroupMemberList>
                {selectedGroup.users.map((groupMember: any) => (
                  <GroupMember key={groupMember.userId}>
                    <GroupImg>
                      <img src={groupMember.profileImage} alt="person icon" />
                    </GroupImg>
                    <MemberNickname>{groupMember.userNickname}</MemberNickname>
                  </GroupMember>
                ))}
              </GroupMemberList>
            </GroupMemberListWrapper>
          </GridItem>
          <GridItem>
            <JoinCodeGuide>초대 코드</JoinCodeGuide>
            <JoinCode onClick={clickGroupCode}>
              <FcInspectionWrapper>
                <FcInspection />
              </FcInspectionWrapper>
              {selectedGroup.groupCode}
            </JoinCode>
            <DropGuideWrapper>그룹 탈퇴</DropGuideWrapper>
            <GroupDropWrapper>
              {!clickedDropBtn && <DropGroupButtonWrapper onClick={onClickDropBtn}>탈퇴</DropGroupButtonWrapper>}
              {clickedDropBtn && (
                <>
                  <Notice>그룹을 탈퇴하시겠습니까?</Notice>
                  <YesNoButtonWrapper>
                    <YesNoButton onClick={onClickConfirmBtn}>네</YesNoButton>
                    <YesNoButton onClick={onClickCancelBtn}>아니오</YesNoButton>
                  </YesNoButtonWrapper>
                </>
              )}
            </GroupDropWrapper>
          </GridItem>
        </Content>
      </ModalContainer>
    </Modal>
  );
};

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 90%;
`;

const modalSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  position: absolute;
  height: 38rem;
  width: 50rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
  padding: 2rem;
`;
const Header = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  height: 3rem;
`;
const TitleWrapper = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  grid-column-start: 2;
  grid-column-end: 3;
  ${flexRowCenterAlign}
`;
const CloseBtn = styled.div`
  width: 100%;
  ${flexRowCenterAlign}
  grid-column-start: 3;
  grid-column-end: 4;

  & > button {
    background-color: ${COLOR.WHITE};
    border: none;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    ${flexRowCenterAlign}
    cursor: pointer;
    &:hover {
      background-color: ${COLOR.GRAY};
    }
  }
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-items: center;
  font-size: 1.5rem;

  height: 35rem;
`;
const JoinCodeGuide = styled.div`
  font-weight: bold;
  border-bottom: 1px solid ${COLOR.GRAY};
`;

const JoinCode = styled.div`
  color: ${(props) => props.theme.SECONDARY};
  margin-top: 1rem;
  padding-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box;
  height: 3.5rem;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.PRIMARY};
  }
`;
const FcInspectionWrapper = styled.div`
  ${flexRowCenterAlign}
`;
const GroupMemberListWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
  height: 90%;
  border-bottom: 1px solid ${COLOR.GRAY};
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.SECONDARY};
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
const GroupMemberListGuide = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  font-weight: 600;
  border-bottom: 1px solid ${COLOR.GRAY};
`;
const GroupMemberList = styled.div`
  display: flex;
  flex-direction: column;
`;
const GroupMember = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const GroupImg = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  border: 1px solid ${COLOR.GRAY};

  & > img {
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
  }
`;
const MemberNickname = styled.div`
  ${flexRowCenterAlign};
  margin-left: 2rem;
`;
const GroupDropWrapper = styled.div`
  ${flexColumnCenterAlign};
  width: 100%;
  margin-top: 3rem;
`;
const DropGuideWrapper = styled.div`
  width: 100%;
  font-weight: bold;
  border-bottom: 1px solid ${COLOR.GRAY};
  margin-top: 3rem;
`;
const DropGroupButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 10rem;
  height: 4rem;
  border-radius: 10px;
  border: 2px solid ${COLOR.RED};
  cursor: pointer;
  color: ${COLOR.RED};
  font-weight: bold;
`;
const YesNoButton = styled.button`
  ${flexRowCenterAlign}
  width: 10rem;
  height: 4rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 2rem;
  margin: 1rem;
  color: ${COLOR.WHITE};
`;
const YesNoButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  & button:nth-child(1) {
    background-color: ${COLOR.RED};
    border: 1px solid ${COLOR.RED};
  }
  & button:nth-child(2) {
    background-color: ${COLOR.GRAY};
    border: 1px solid ${COLOR.GRAY};
  }
`;
const Notice = styled.div`
  padding-bottom: 2rem;
`;

export default GroupInfoModal;
