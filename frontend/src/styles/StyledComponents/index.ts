import { css } from "styled-components";

const flexRowCenterAlign = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flexColumnCenterAlign = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const yesNoButtonWrapper = css`
  width: 120px;
  height: 40px;
  border-radius: 10px;
  margin-left: 30px;
  cursor: pointer;
  font-size: 2.2rem;
`;

export { flexRowCenterAlign, flexColumnCenterAlign, yesNoButtonWrapper };
