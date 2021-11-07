import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const Header = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const otherTopPage = pathname != "/"; // toppage以外
  const onlyTopPage = pathname == "/"; // toppageのみ

  const filterFunc = () => {
    console.log("filterFunc");
  };

  return (
    <HeaderLayout>
      {otherTopPage && (
        <Link href="/" passHref as="/">
          <ReturnText>戻る</ReturnText>
        </Link>
      )}
      <Title>Tabetai</Title>
      {onlyTopPage && (
        <>
          <FilterText onClick={filterFunc}>絞り込む</FilterText>
        </>
      )}
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
const ReturnText = styled.a`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translate(0, -50%);
  font-size: 14px;
  color: #fff;
`;
const Title = styled.h1`
  font-size: 22px;
  color: #fff;
`;
const FilterText = styled.p`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
  font-size: 14px;
  color: #fff;
`;

export default Header;
