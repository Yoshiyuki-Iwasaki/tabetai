import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  margin-top: 80px;
`;

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
