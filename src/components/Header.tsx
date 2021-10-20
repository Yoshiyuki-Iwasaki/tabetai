import Link from "next/link";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderLayout>
      <Link href="/" passHref as="/">
        <a>戻る</a>
      </Link>
      <Title>Tabetai</Title>
    </HeaderLayout>
  );
};

const HeaderLayout = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background: #333;
  z-index: 1;
`;
const Title = styled.h1`
  font-size: 22px;
  color: #fff;
`;

export default Header;
