import styled from "styled-components";
import COLOR from "@src/styles/Color";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";
import shortid from "shortid";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import { ReactComponent as MoreVertSVG } from "@styles/icons/more-vert.svg";
import PostSettingModal from "./Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const textSplit = (text: string) => {
  return text.split("\n");
};

const highlights = (text: string) => {
  const splited = text.split(/[\u0020]/);
  const makeSpan = (word: string, idx: number) => {
    if (idx === splited.length - 1)
      return (
        <span key={idx}>
          {word}
          <br />
        </span>
      );

    return <span key={idx}>{word} </span>;
  };

  return splited.map((word, idx) =>
    word.match(/#([\w|ㄱ-ㅎ|가-힣]+)/) ? (
      <span key={idx}>
        <mark>{word}</mark>&nbsp;
      </span>
    ) : (
      makeSpan(word, idx)
    ),
  );
};

const PostInfoModal = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { selectedPost } = useSelector((state: RootState) => state.modal);

  console.log(selectedPost);

  return (
    <ModalContainer
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest(".more-icon")) setModalOpened(false);

        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <Modal>
        <ModalHeader>
          <PostTitle>{selectedPost.postTitle}</PostTitle>
          <MoreIconWrapper
            className="more-icon"
            onClick={() => {
              setModalOpened((prev) => !prev);
            }}
          >
            <MoreVertSVG fill={COLOR.BLACK} />
          </MoreIconWrapper>
          {modalOpened && <PostSettingModal />}
        </ModalHeader>
        <CarouselWrapper>
          <Carousel files={selectedPost.images} carouselWidth={250} />
        </CarouselWrapper>
        <ModalContent>{textSplit(selectedPost.postContent).map((item) => highlights(item))}</ModalContent>
        <ModalFooter>
          <FooterItem>{selectedPost.postDate}</FooterItem>
          <FooterItem>{selectedPost.userNickname}</FooterItem>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${COLOR.WHITE};
  width: 50rem;
  height: 70rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const CarouselWrapper = styled.div`
  border-bottom: 0.2rem solid ${COLOR.GRAY};
  height: 40rem;
  box-sizing: border-box;
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  position: relative;
  border-bottom: 0.2rem solid ${COLOR.GRAY};
`;
const PostTitle = styled.div`
  ${flexRowCenterAlign}
  grid-column-start: 2;
  grid-column-end: 3;
  font-family: "NanumDaCaeSaRang";
  font-size: 3rem;
  height: 8rem;
`;
const MoreIconWrapper = styled.div`
  ${flexRowCenterAlign}
  grid-column-start: 3;
  grid-column-end: 4;
  cursor: pointer;
`;
const ModalContent = styled.div`
  font-size: 2.5rem;
  padding: 1rem 1rem 1rem 1rem;
  overflow-y: auto;
  font-family: "NanumDaCaeSaRang";
  white-space: pre-line;
  height: 20rem;
  box-sizing: border-box;

  & mark {
    border-radius: 3px;
    color: ${COLOR.WHITE};
    background-color: ${(props) => props.theme.SECONDARY};
    font-size: 2.5rem;
    font-family: "NanumDaCaeSaRang";
  }

  & span {
    font-family: "NanumDaCaeSaRang";
  }
`;
const ModalFooter = styled.div`
  padding-top: 1rem;
  color: ${COLOR.DARKGRAY};
  font-size: 2.5rem;
  display: flex;
  justify-content: flex-end;
  vertical-align: bottom;
  font-family: "NanumDaCaeSaRang";
  box-sizing: border-box;
`;
const FooterItem = styled.div`
  padding-right: 1rem;
  font-family: "NanumDaCaeSaRang";
`;

export default PostInfoModal;
