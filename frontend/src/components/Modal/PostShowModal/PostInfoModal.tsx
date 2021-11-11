import styled from "styled-components";
import COLOR from "@src/styles/Color";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";
import shortid from "shortid";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import { ReactComponent as MoreVertSVG } from "@styles/icons/more-vert.svg";
import PostSettingModal from "./Modal";
import { useState } from "react";

const post = {
  postID: 0,
  postTitle: "스타벅스 리저브",
  postContent:
    "즐거운 여행 이정도 글은 쓸 #hi 거같아요즐거칸입니다.\n\n이정도 글은 쓸거같아요 이정도 글은 쓸 거같아요\n\n\n\n #podo  #Cheers #모래",
  postDate: "2021.10.26 15:40",
  postLocation: "강남역",
  userNickname: "작성자 닉네임",
  postImages: [
    { file: "/img/podo.png", key: shortid.generate() },
    { file: "/img/glass.jpg", key: shortid.generate() },
    { file: "/img/sand.jpg", key: shortid.generate() },
  ],
};

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

    return <span key={idx}>{word}</span>;
  };

  return splited.map((word, idx) =>
    word.match(/#([\w|ㄱ-ㅎ|가-힣]+)/) ? <mark key={idx}>{word} </mark> : makeSpan(word, idx),
  );
};

const PostInfoModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

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
          <PostTitle>{post.postTitle}</PostTitle>
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
          <Carousel files={post.postImages} carouselWidth={250} />
        </CarouselWrapper>
        <ModalContent>{textSplit(post.postContent).map((item) => highlights(item))}</ModalContent>
        <ModalFooter>
          <FooterItem>{post.postDate}</FooterItem>
          <FooterItem>{post.userNickname}</FooterItem>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${COLOR.WHITE};
  width: 500px;
  height: 70vh;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CarouselWrapper = styled.div`
  padding: 1rem 0;
  border-bottom: 0.3rem solid ${COLOR.GRAY};
  border-top: 0.3rem solid ${COLOR.GRAY};
  height: 40vh;
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  height: 10vh;
  position: relative;
`;
const PostTitle = styled.div`
  ${flexRowCenterAlign}
  grid-column-start: 2;
  grid-column-end: 3;
  font-family: "NanumDaCaeSaRang";
  font-size: 2rem;
`;
const MoreIconWrapper = styled.div`
  ${flexRowCenterAlign}
  grid-column-start: 3;
  grid-column-end: 4;
  cursor: pointer;
`;
const ModalContent = styled.div`
  font-size: 1.5rem;
  padding: 1rem 1rem 1rem 1rem;
  overflow-y: scroll;
  font-family: "NanumDaCaeSaRang";
  white-space: pre-line;
  height: 20vh;

  & mark {
    border-radius: 3px;
    color: ${COLOR.WHITE};
    background-color: ${(props) => props.theme.SECONDARY};
    font-size: 1.5rem;
    font-family: "NanumDaCaeSaRang";
  }

  & span {
    font-family: "NanumDaCaeSaRang";
  }
`;
const ModalFooter = styled.div`
  padding-top: 1rem;
  color: ${COLOR.DARKGRAY};
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-end;
  vertical-align: bottom;
  font-family: "NanumDaCaeSaRang";
`;
const FooterItem = styled.div`
  padding-right: 1rem;
  font-family: "NanumDaCaeSaRang";
`;

export default PostInfoModal;
