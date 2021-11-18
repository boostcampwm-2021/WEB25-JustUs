import { useState, Dispatch, SetStateAction } from "react";
import styled, { keyframes } from "styled-components";
import { flexColumnCenterAlign, flexRowCenterAlign, yesNoButtonWrapper } from "@src/styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch, useSelector } from "react-redux";
import COLOR from "@styles/Color";
import { GroupAction } from "@src/action";
import { RootState } from "@src/reducer";
import { deleteGroupAction } from "@src/reducer/GroupReducer";

interface SettingGroupModalProps {
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const SettingGroupModal = ({ setIsToggle }: SettingGroupModalProps) => {
  const [clickedDropBtn, setClickedDropclickedDropBtn] = useState(false);
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClickDropBtn = () => {
    setClickedDropclickedDropBtn(true);
  };
  const onClickConfirmBtn = () => {
    const { groupID } = selectedGroup;
    // dispatch({ type: GroupAction.DELETE_GROUP, payload: { groupID } });
    dispatch(deleteGroupAction({ groupID }));

    closeModal();
    setIsToggle(false);
  };

  const onClickCancelBtn = () => {
    setClickedDropclickedDropBtn(false);
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <Title>그룹 설정</Title>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
        </Header>
        <ContentWrapper>
          <Content>
            <JoinCodeWrapper>
              <JoinCodeGuide>초대 코드</JoinCodeGuide>
              <JoinCode>{selectedGroup.groupCode}</JoinCode>
            </JoinCodeWrapper>
            <GroupMemberListWrapper>
              <GroupMemberListGuide>그룹원</GroupMemberListGuide>
              <GroupMemberList>
                {/* {groupMemberList.map((groupMember) => ( */}
                {selectedGroup.users.map((groupMember: any) => (
                  <GroupMember key={groupMember.userID}>
                    <GroupImg>
                      {/* <img src="/icons/person.svg" alt="person icon" /> */}
                      <img src={groupMember.profileImage} alt="person icon" />
                    </GroupImg>
                    <MemberNickname>{groupMember.userNickname}</MemberNickname>
                  </GroupMember>
                ))}
              </GroupMemberList>
            </GroupMemberListWrapper>
            <GroupDropWrapper>
              <DropGuideWrapper>그룹 탈퇴</DropGuideWrapper>
              {!clickedDropBtn && <DropGroupButtonWrapper onClick={onClickDropBtn}>탈퇴하기</DropGroupButtonWrapper>}
              {clickedDropBtn && (
                <>
                  <YesButtonWrapper onClick={onClickConfirmBtn}>예</YesButtonWrapper>
                  <NoButtonWrapper onClick={onClickCancelBtn}>아니오</NoButtonWrapper>
                </>
              )}
            </GroupDropWrapper>
          </Content>
        </ContentWrapper>
      </ModalContainer>
    </Modal>
  );
};

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
  min-height: 70vh;
  min-width: 35vw;
  border-radius: 2rem;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  margin-top: 2rem;
`;

const Title = styled.div`
  font-size: 3.5rem;
  grid-column-start: 2;
  grid-column-end: 3;
  ${flexRowCenterAlign}
  padding: 2rem;
`;

const CloseBtn = styled.div`
  width: 100%;
  ${flexRowCenterAlign}
  grid-column-start: 3;
  grid-column-end: 4;

  & > button {
    background-color: ${COLOR.WHITE};
    border: none;
    cursor: pointer;
  }
`;

const ContentWrapper = styled.div`
  ${flexColumnCenterAlign}
`;
const Content = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
`;

const JoinCodeWrapper = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
`;

const JoinCodeGuide = styled.div`
  width: 25%;
  font-size: 2.5rem;
`;

const JoinCode = styled.div`
  font-size: 18px;
  margin-left: 30px;
`;

const GroupMemberListWrapper = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  height: 300px;
  overflow-y: auto;
`;

const GroupMemberListGuide = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  font-size: 2.5rem;
`;

const GroupMemberList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
const GroupMember = styled.div`
  font-size: 1.6rem;
  display: flex;
  margin-top: 1rem;
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
  display: flex;
  width: 100%;
  margin-top: 3rem;

  & > .guide {
    font-size: 20px;
  }
`;

const DropGuideWrapper = styled.div`
  padding-top: 10px;
  width: 25%;
  font-size: 2.5rem;
`;

const DropGroupButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 10rem;
  height: 4rem;
  border-radius: 10px;
  border: 2px solid ${COLOR.RED};
  margin-left: 30px;
  cursor: pointer;
  font-size: 2.2rem;
`;

const YesButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  ${yesNoButtonWrapper}
  border: 2px solid ${COLOR.RED};
`;

const NoButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  ${yesNoButtonWrapper}
  border: 2px solid ${COLOR.BLUE};
`;

export default SettingGroupModal;
