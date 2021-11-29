import { useEffect } from "react";
import styled from "styled-components";
import COLOR from "@src/styles/Color";
import { flexColumnCenterAlign, flexRowCenterAlign } from "@src/styles/StyledComponents";
import { RootState } from "@src/reducer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { image } from "@src/constants";
const Login = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const LOGIN_URL = `${SERVER_URL}/api/auth/login`;
  const TEST_URL = "http://justus.kr/api/auth/demo/login";
  const { userProfile, userInfoLoading } = useSelector((state: RootState) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (userProfile) {
      history.push("/");
    }
  }, [userProfile]);

  if (userInfoLoading) return <></>;
  return (
    <>
      <BackgroundImg imgUrl={image.sand}>
        <BackgroundWrap>
          <Content>
            <LeftSide>
              <div>
                <Logo>
                  <img src={image.podo} alt="justus logo" height="50px" />
                  <LogoText>우리끼리</LogoText>
                </Logo>
                <LogoInfoText>흩어진 추억을 한 곳에 기록해보세요</LogoInfoText>
              </div>
              <a href={LOGIN_URL}>
                <img src={image.naverLogin} alt="naver social login" width="350px" />
              </a>
              <a href={TEST_URL}>
                <TestLoginBtn>테스트 계정으로 로그인</TestLoginBtn>
              </a>
            </LeftSide>
            <div id="right-side">
              <Polaroid id="polaroid">
                <img src={image.glass} width="300px" height="300px" alt="glass" />
                <img src={image.lifeIsTravel} height="40px" alt="life is travel" />
              </Polaroid>
            </div>
          </Content>
          <Footer>
            <FooterContent>
              <p>Copyright ⓒ Team UNDEFINED. 모든 권리 보유.</p>
              <div>
                <span>우리끼리</span>
                <img src={image.githubIcon} height="18px" alt="github icon" />
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
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  height: 100vh;
  z-index: 1;
  position: relative;
`;

const BackgroundWrap = styled.div`
  ${flexRowCenterAlign}
  height: 100vh;
  background-color: ${COLOR.WRAP};
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

  & > a {
    width: 350px;
    text-decoration-line: none;
  }
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
  ${flexColumnCenterAlign}
  width: 340px;
  height: 500px;
  border-radius: 15px;
  background-color: ${COLOR.WHITE};
  box-shadow: 15px 15px 15px ${COLOR.SHADOW_BLACK};
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
  border-top: 2px solid ${COLOR.BLACK};
  & > p {
    font-weight: bold;
    margin-bottom: 5px;
  }
  & > div {
    ${flexRowCenterAlign}
    & .names {
      color: ${COLOR.DARKGRAY};
      padding-left: 10px;
    }
  }
`;
const TestLoginBtn = styled.div`
  width: 100%;
  height: 100%;
  height: 70px;
  font-size: 25px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.THEME3.PRIMARY};
  cursor: pointer;
  border-radius: 4px;
  user-select: none;
  ${flexRowCenterAlign};
`;

export default Login;
