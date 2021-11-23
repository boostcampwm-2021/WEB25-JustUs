import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
const Empty = () => {
  const dispatch = useDispatch();
  const onClickCreateGroupBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: "OPEN_MODAL", payload: "CreateGroupModal" });
  };

  const onClickJoinGroupBtn = () => {
    dispatch({ type: "OPEN_MODAL", payload: "JoinGroupModal" });
  };

  return (
    <EmptyContainer>
      <Appareil>
        <Bandes>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Bandes>
        <Objectif />
        <Lentille />
        <Souslentille />
        <Pointe />
        <Flash />
        <Fente />
      </Appareil>
      <Photo>
        <Cache></Cache>
      </Photo>
      <button onClick={onClickCreateGroupBtn}>그룹 생성</button>
      <button onClick={onClickJoinGroupBtn}>그룹 참가</button>
    </EmptyContainer>
  );
};

const EmptyContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 90vh;
  background-color: ${(props) => props.theme.SECONDARY};
  padding-top: 5vh;
  overflow: hidden;
`;
const Appareil = styled.div`
  background: #ffffff; /* Old browsers */
  background: -moz-linear-gradient(top, #ffffff 37%, #d4d3d3 99%, #d0d0d0 100%, #989898 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #ffffff 37%,
    #d4d3d3 99%,
    #d0d0d0 100%,
    #989898 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffffff 37%,
    #d4d3d3 99%,
    #d0d0d0 100%,
    #989898 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  width: 400px;
  height: 280px;
  margin: auto;
  border-radius: 40px;
  position: relative;
`;
const Bandes = styled.div`
  background-color: white;
  position: absolute;
  left: 50%;
  right: 0;
  height: 18px;
  top: calc(50% - (18px / 2));
  & > div {
    height: calc(18px / 6);
    width: 100%;
    display: block;
  }

  & > div:nth-child(1) {
    background-color: #b25577;
  }
  & > div:nth-child(2) {
    background-color: #e0823d;
  }
  & > div:nth-child(3) {
    background-color: #e1b148;
  }
  & > div:nth-child(4) {
    background-color: #babd29;
  }
  & > div:nth-child(5) {
    background-color: #4d9540;
  }
  & > div:nth-child(6) {
    background-color: #0b6094;
  }
`;
const Objectif = styled.div`
  background-color: #4a4a4c;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: absolute;
  left: calc((400px / 2) - (120px / 2));
  top: calc((280px / 2) - (120px / 2));
  border: 4px solid #26262d;
`;
const Lentille = styled.div`
  background-color: #312f34;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  left: calc((400px / 2) - (80px / 2));
  top: calc((280px / 2) - (80px / 2));
  border: 4px solid #29292d;
`;
const Souslentille = styled.div`
  background-color: #312f32;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  left: calc((400px / 2) - (30px / 2));
  top: calc((280px / 2) - (30px / 2));
  border: 4px solid #3c3a3f;
`;
const Pointe = styled.div`
  background-color: black;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  left: calc((400px / 2) - (6px / 2));
  top: calc((280px / 2) - (6px / 2));
`;

const flash = keyframes`
0%{
  background-color: white;
  border-color: white;
  transform: scale(1);
}
5% {
  background-color: white;
  border-color: white;
  transform: scale(100);
}
7% {
  border: 4px solid #9E9388;
  background-color: #978956;
  transform: scale(1);
  opacity: 0;
}
8% {
  opacity: 1;
}
30% {
  border: 4px solid #9E9388;
  background-color: #978956;
  transform: scale(1);
}`;

const imprime = keyframes`
10%{
  height: 0px;
}
40% {
  height: 300px;
}
60% {
  transform: translateY(-20px);
}
90%{
  opacity: 1;
}
100% {
  height: 300px;
  opacity: 0;
  transform: translateY(100vh) rotate(45deg);
}`;

const Flash = styled.div`
  border: 4px solid #9e9388;
  background-color: #978956;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  position: absolute;
  left: 80px;
  top: 40px;
  z-index: 19;
  animation: ${flash} 6s 1s linear infinite;
`;
const Fente = styled.div`
  background-color: #a7a7a7;
  border: 1px solid #bdbdbd;
  width: 80%;
  bottom: 20px;
  position: absolute;
  left: 10%;
  height: 3px;
  border-radius: 50%;
`;
const Photo = styled.div`
  background-color: #eee;
  width: 315px;
  height: 0;
  margin: auto;
  position: absolute;
  left: calc(50vw - 315px / 2);
  transform: translateY(-20px);
  animation: ${imprime} 6s 1s linear infinite;
`;
const Cache = styled.div`
  height: 80%;
  width: 90%;
  margin-left: 5%;
  margin-top: 2%;
  background-color: #dddddd91;
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
  background-image: url("/icons/podo-many-high.png");
`;

export default Empty;
