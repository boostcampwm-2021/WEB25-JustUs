import React from "react";
import styled from "styled-components";
import Color from "@src/styles/Color";

const Login = () => {
  return (
    <>
      <BackgroundImg imgUrl="/img/sand.jpg">
        <BackgroundWrap>
          <Content>
            <LeftSide>
              <div>
                <Logo>
                  <img src="/img/podo.png" alt="justus logo" height="50px" />
                  <LogoText>우리끼리</LogoText>
                </Logo>
                <LogoInfoText>흩어진 추억을 한 곳에 기록해보세요</LogoInfoText>
              </div>
              <img src="/img/btnG_완성형.png" alt="naver social login" width="350px" />
            </LeftSide>
            <div id="right-side">
              <Polaroid id="polaroid">
                <img src="/img/glass.jpg" width="300px" height="300px" alt="glass" />
                <img src="/img/life_is_travel.png" height="40px" alt="life is travel" />
              </Polaroid>
            </div>
          </Content>
          <Footer>
            <FooterContent>
              <p>Copyright ⓒ Team UNDEFINED. 모든 권리 보유.</p>
              <div>
                <span>우리끼리</span>
                <img src="/img/github_icon.png" height="18px" alt="github icon" />
                <span className="names">공필상 | 김무성 | 김영한 | 조명희</span>
              </div>
            </FooterContent>
          </Footer>
        </BackgroundWrap>
      </BackgroundImg>
    </>
  );
};

const BackgroundImg = styled.div<{ imgUrl: string }>`
  background-image: url(${props => props.imgUrl});
  background-size: cover;
  height: 100vh;
`;

const BackgroundWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Color.wrap};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 500px;
  width: 80vw;
  margin: 0 auto;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
`;

const Logo = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const LogoText = styled.h1`
  font-size: 30px;
  font-weight: bold;
  line-height: 50px;
  margin-left: 10px;
`;

const LogoInfoText = styled.p`
  font-size: 40px;
  font-weight: bold;
`;

const Polaroid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 500px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.25);
  & > img {
    padding-top: 35px;
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0px;
  text-align: center;
  width: 100vw;
`;

const FooterContent = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 80vw;
  border-top: 2px solid black;
  & > p {
    font-weight: bold;
    margin-bottom: 5px;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    & .names {
      color: ${Color.darkgray};
      padding-left: 10px;
    }
  }
`;

export default Login;
