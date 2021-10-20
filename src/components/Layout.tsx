import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  margin: 80px 15px 0;
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
