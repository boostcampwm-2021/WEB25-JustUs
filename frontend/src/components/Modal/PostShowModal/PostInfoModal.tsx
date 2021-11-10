import styled from "styled-components";
import COLOR from "@src/styles/Color";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";
import shortid from "shortid";
import { flexRowCenterAlign, flexColumnCenterAlign } from "@styles/StyledComponents";
import { ReactComponent as MoreVertSVG } from "@styles/icons/more-vert.svg";

interface FileObject {
  file: string;
  key: string;
}

const files: FileObject[] = [
  { file: "/img/podo.png", key: shortid.generate() },
  { file: "/img/glass.jpg", key: shortid.generate() },
  { file: "/img/sand.jpg", key: shortid.generate() },
];
const post = {
  postID: 0,
  postTitle: "스타벅스 리저브",
  postContent:
    "즐거운 여행 어쩌구저쩌구하고 글을 작성하는 칸입니다. 이정도 글은 쓸거같아요즐거칸입니다. 이정도 글은 쓸거같아요이정도 글은 쓸거같아요",
  postDate: "2021.10.26 15:40",
  postLocation: "강남역",
  userNickname: "작성자 닉네임",
};

const PostInfoModal = () => {
  return (
    <ModalContainer
      onClick={(event) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <Modal>
        <ModalHeader>
          <div></div>
          <PostTitle>{post.postTitle}</PostTitle>
          <MoreIconWrapper>
            <MoreVertSVG fill={COLOR.BLACK} />
          </MoreIconWrapper>
        </ModalHeader>

        <CarouselWrapper>
          <Carousel files={files} carouselWidth={350} />
        </CarouselWrapper>

        <ModalContent>{post.postContent}</ModalContent>
        <ModalFooter>
          <PostDate>{post.postDate}</PostDate>
          <UserNickname>{post.userNickname}</UserNickname>
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
  height: 750px;
  // border-radius: 10px;

  // box-shadow: 5px 5px 1px ${COLOR.GRAY};

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
  // border: 0.8rem solid ${COLOR.THEME1.SECONDARY};
  border-bottom: 0.3rem solid ${COLOR.GRAY};
  border-top: 0.3rem solid ${COLOR.GRAY};
  // border-radius: 10px;
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  font-size: 1.2rem;
  font-weight: bold;
  // border-bottom: 1px solid ${COLOR.GRAY};
  width: 100%;
  height: 10vh;
`;
const PostTitle = styled.div`
  ${flexRowCenterAlign}
  grid-columns-start: 2;
  grid-columns-end: 3;
`;
const MoreIconWrapper = styled.div`
  ${flexRowCenterAlign}
  grid-columns-start: 3;
  grid-columns-end: 4;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  padding: 1rem 1rem 1rem 1rem;
  overflow-y: scroll;
  font-family: "NanumDaCaeSaRang";
`;
const ModalFooter = styled.div`
  padding-top: 1rem;
  color: ${COLOR.DARKGRAY};
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-end;
  vertical-align: bottom;

  & > .location {
    font-size: 1rem;
    color: ${COLOR.BLACK};
  }
`;
const PostDate = styled.div``;
const UserNickname = styled.div`
  font-size: 1.2rem;
  color: ${COLOR.BLACK};
  padding-right: 1rem;
`;

export default PostInfoModal;
