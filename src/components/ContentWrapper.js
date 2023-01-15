import styled from "styled-components";

const ContentWrapper = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  margin-top: 2em;
  padding: 1em;
  overflow-y: scroll;
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 20px;
    height: calc(100% - 64px);
    width: calc(100% - 220px);
  }
`;

export default ContentWrapper;
