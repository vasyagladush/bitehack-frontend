import { Nav } from "react-bootstrap";
import { House } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { LinkWithLanguageQueryParam } from "../containers/LinkWithLanguageQueryParam";
import { UserStore } from "../redux/reducers/user";
import { RootState } from "../redux/store";

const StyledNav = styled(Nav)`
  .nav-link,
  a {
    color: black;
    text-decoration: none;
    padding: 0 0.7rem 0 0;
  }
`;

const StyledSpan = styled.span`
  @media (max-width: 1125px) {
    display: none;
  }
  @media (max-width: 575px) {
    display: block;
  }
`;

const NavigationBar = () => {
  const user = useSelector<RootState>((store) => store.user) as UserStore;
  const { t } = useTranslation();
  return (
    <StyledNav className="d-flex flex-column " defaultActiveKey="/">
      <Nav.Item className="d-flex align-items-center ps-2 pb-2 pt-3">
        <Nav.Link as={LinkWithLanguageQueryParam} to="/">
          <House size={20} className="my-2" />
        </Nav.Link>
        <Nav.Link as={LinkWithLanguageQueryParam} to="/">
          <StyledSpan className="fs-5">{t("navigationBar.home")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
    </StyledNav>
  );
};

export default NavigationBar;
