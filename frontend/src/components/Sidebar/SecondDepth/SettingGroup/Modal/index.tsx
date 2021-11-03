import { useState } from "react";
import styled from "styled-components";
import { flexCenterAlign, yesNoButtonWrapper } from "@src/styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import Color from "@styles/Color";
import { GroupModalAction } from "@src/action";

interface SettingGroupModalProps {
  closeFn: () => void;
  open: boolean;
}

const groupMemberList = [
  {
    userID: 0,
    userNickname: "그 김영한 아님",
  },
  {
    userID: 1,
    userNickname: "집사",
  },
  {
    userID: 2,
    userNickname: "GPS",
  },
  {
    userID: 3,
    userNickname: "맹",
  },
  {
    userID: 4,
    userNickname: "테스트 유저1",
  },
  {
    userID: 5,
    userNickname: "테스트 유저2",
  },
  {
    userID: 6,
    userNickname: "테스트 유저3",
  },
];

const SettingGroupModal = ({ closeFn, open = false }: SettingGroupModalProps) => {
  const [clickedDropBtn, setClickedDropclickedDropBtn] = useState(false);
  const dispatch = useDispatch();
  const closeSettingGroupModal = () => {
    dispatch({ type: GroupModalAction.CLOSE_SETTING_GROUP_MODAL });
  };
  const onClickDropBtn = () => {
    setClickedDropclickedDropBtn(true);
  };

  return (
    <Modal open={open} closeFn={closeFn}>
      <ModalContainer
        onClick={event => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <CloseBtn>
            <button
              type="button"
              onClick={() => {
                closeFn();
                closeSettingGroupModal();
              }}
            >
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
          <Title>그룹 설정</Title>
          <Content>
            <JoinCodeWrapper>
              <JoinCodeGuide>초대 코드</JoinCodeGuide>
              <JoinCode>D3WFq2GL1</JoinCode>
            </JoinCodeWrapper>
            <GroupMemberListWrapper>
              <GroupMemberListGuide>그룹원</GroupMemberListGuide>
              <GroupMemberList>
                {groupMemberList.map(groupMember => (
                  <GroupMember key={groupMember.userID}>
                    <img src="/icons/person.svg" alt="person icon" />
                    {groupMember.userNickname}
                  </GroupMember>
                ))}
              </GroupMemberList>
            </GroupMemberListWrapper>
            <GroupDropWrapper>
              <DropGuideWrapper>그룹 탈퇴</DropGuideWrapper>
              {!clickedDropBtn && <DropGroupButtonWrapper onClick={onClickDropBtn}>탈퇴하기</DropGroupButtonWrapper>}
              {clickedDropBtn && (
                <>
                  <YesButtonWrapper onClick={onClickDropBtn}>예</YesButtonWrapper>
                  <NoButtonWrapper onClick={onClickDropBtn}>아니오</NoButtonWrapper>
                </>
              )}
            </GroupDropWrapper>
          </Content>
        </Header>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  background-color: ${Color.white};
  min-height: 30vw;
  min-width: 40vw;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 40px;
`;

const CloseBtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 30px;
  margin-right: 30px;

  & > button {
    background-color: ${Color.white};
    border: none;
  }
`;

const Content = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
`;

const JoinCodeWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
`;

const JoinCodeGuide = styled.div`
  width: 25%;
`;

const JoinCode = styled.div`
  font-size: 18px;
  margin-left: 30px;
`;

const GroupMemberListWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  height: 300px;
  overflow-y: auto;
`;

const GroupMemberListGuide = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const GroupMemberList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
const GroupMember = styled.div``;

const GroupDropWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;

  & > .guide {
    font-size: 20px;
  }
`;

const DropGuideWrapper = styled.div`
  padding-top: 10px;
  width: 25%;
`;

const DropGroupButtonWrapper = styled.div`
  ${flexCenterAlign}
  width: 120px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid ${Color.red};
  margin-left: 30px;
`;

const YesButtonWrapper = styled.div`
  ${flexCenterAlign}
  ${yesNoButtonWrapper}
  border: 2px solid ${Color.red};
`;

const NoButtonWrapper = styled.div`
  ${flexCenterAlign}
  ${yesNoButtonWrapper}
  border: 2px solid ${Color.blue};
`;

export default SettingGroupModal;
