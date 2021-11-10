import styled from "styled-components";
import COLOR from "@src/styles/Color";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";
import shortid from "shortid";
import { flexRowCenterAlign, flexColumnCenterAlign } from "@styles/StyledComponents";
import { ReactComponent as MoreVertSVG } from "@styles/icons/more-vert.svg";
import ReactDOMServer from "react-dom/server";

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
    "즐거운 여행 #podo 이정도 글은 쓸거같아요즐거칸입니다. 이정도 #모래 글은 쓸거같아요이정도 글은 쓸 #Cheers 거같아요",
  postDate: "2021.10.26 15:40",
  postLocation: "강남역",
  userNickname: "작성자 닉네임",
};

const highlights = (text: string) => {
  return text.replace(/#([\w|ㄱ-ㅎ|가-힣]+)/g, "<mark>$&</mark>");
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
        <ModalContent>
          <div dangerouslySetInnerHTML={{ __html: highlights(post.postContent) }}></div>
        </ModalContent>
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
  height: 750px;

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
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  height: 10vh;
`;
const PostTitle = styled.div`
  ${flexRowCenterAlign}
  grid-columns-start: 2;
  grid-columns-end: 3;
  font-family: "NanumDaCaeSaRang";
  font-size: 2rem;
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

  & div {
    font-family: "NanumDaCaeSaRang";

    & mark {
      border-radius: 3px;
      color: white;
      background-color: ${(props) => props.theme.SECONDARY};
      letter-spacing: normal;
      font-size: 1.2rem;
      width: 400px;
      height: 200px;
      overflow: auto;
    }
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
