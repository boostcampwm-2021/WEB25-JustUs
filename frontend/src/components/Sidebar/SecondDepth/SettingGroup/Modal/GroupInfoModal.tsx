import React, { useState, Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import {
  flexColumnCenterAlign,
  flexRowCenterAlign,
  mideumModalContainer,
  mideumModalHeader,
  mideumModalTitle,
  mideumModalCloseButton,
  mideumModalContent,
  scrollbar,
} from "@src/styles/StyledComponents";
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
          <Title title={selectedGroup.groupName}>{selectedGroup.groupName}</Title>
          <CloseButton type="button" onClick={closeModal}>
            <img src={icon.clear} alt="clear icon" />
          </CloseButton>
        </Header>
        <Content>
          <GridLeft>
            <GridTitle>그룹원</GridTitle>
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
          </GridLeft>
          <GridRight>
            <InviteCode>
              <GridTitle>초대 코드</GridTitle>
              <JoinCode onClick={clickGroupCode}>
                <FcInspectionWrapper>
                  <FcInspection />
                </FcInspectionWrapper>
                {selectedGroup.groupCode}
              </JoinCode>
              <p>위 초대 코드를 클릭하시면 코드가 복사됩니다:)</p>
            </InviteCode>
            <ResignGroup>
              <GridTitle>그룹 탈퇴</GridTitle>
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
            </ResignGroup>
          </GridRight>
        </Content>
      </ModalContainer>
    </Modal>
  );
};
const borderBottom = css`
  border-bottom: 0.2rem solid ${COLOR.GRAY};
`;
const contentMarginTop = css`
  & > * {
    margin-top: 1rem;
    &:first-child {
      margin: 0;
    }
  }
`;
const ModalContainer = styled.div`
  ${mideumModalContainer}
`;
const Header = styled.div`
  ${mideumModalHeader}
`;
const Title = styled.div`
  ${mideumModalTitle}
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const CloseButton = styled.button`
  ${mideumModalCloseButton}
`;
const Content = styled.div`
  ${mideumModalContent}
  & > * {
    padding-left: 1rem;
    &:first-child {
      padding: 0;
    }
  }
`;
const GridLeft = styled.div`
  display: flex;
  flex-direction: column;
  ${contentMarginTop}
`;
const GridTitle = styled.div`
  font-size: 1.7rem;
  height: 1.5rem;
  font-weight: bold;
  padding-bottom: 1rem;
  ${borderBottom}
`;
const GroupMemberListWrapper = styled.div`
  height: 25rem;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  ${scrollbar}
  ${borderBottom}
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
  font-size: 1.5rem;
`;
const GridRight = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 50% 50%;
`;
const InviteCode = styled.div`
  ${contentMarginTop}
  & > p {
    font-size: 1rem;
  }
`;
const JoinCode = styled.div`
  color: ${(props) => props.theme.PRIMARY};
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box;
  height: 3.5rem;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.SECONDARY};
  }
`;

const GroupDropWrapper = styled.div`
  ${flexColumnCenterAlign};
  position: relative;
`;
const FcInspectionWrapper = styled.div`
  ${flexRowCenterAlign}
`;
const ResignGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 20% 60% 20%;
`;
const DropGroupButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 10rem;
  height: 4rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  border: 0.2rem solid ${COLOR.RED};
  color: ${COLOR.RED};
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
const Notice = styled.div`
  font-size: 1.2rem;
`;
const YesNoButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  & button:nth-child(1) {
    background-color: ${COLOR.RED};
    border: 0.1rem solid ${COLOR.RED};
  }
  & button:nth-child(2) {
    background-color: ${COLOR.GRAY};
    border: 0.1rem solid ${COLOR.GRAY};
  }
  & > * {
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
`;
const YesNoButton = styled.button`
  ${flexRowCenterAlign}
  width: 8rem;
  height: 4rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 2rem;
  margin: 1rem;
  color: ${COLOR.WHITE};
`;

export default GroupInfoModal;
