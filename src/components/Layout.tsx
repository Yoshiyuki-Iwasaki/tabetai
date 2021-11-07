import Header from "./Header";
import styled from "styled-components";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;


const Main = styled.main`
  margin: 130px 15px 40px;
`;