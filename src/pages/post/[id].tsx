import React from 'react'
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../../components/Layout";

const Main = styled.main`
`;

const Eyecatch = styled.figure`
  text-align: center;
`;

const Title = styled.h1`
  margin-top: 15px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
`;
const Catch = styled.p`
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.3;
`;
const Address = styled.p`
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.3;
`;
const Access = styled.p`
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.3;
`;

const DetailLink = styled.a`
  margin-top: 10px;
  display: inline-block;
  border-bottom: 1px solid #333;
  font-size: 13px;
  line-height: 1.3;
`;

const Map = styled.div`
  margin-top: 30px;
`;

const PostDetail = ({ data }) => {
  return (
    <Layout>
      <Main>
        <Eyecatch>
          <Image src={data.photo.mobile.l} width={168} height={168} />
        </Eyecatch>
        <Title>{data.name}</Title>
        <Catch>{data.catch}</Catch>
        <Address>住所:{data.address}</Address>
        <Access>アクセス:{data.access}</Access>
        <Link href={data.urls.pc} passHref as={data.urls.pc}>
          <DetailLink>詳しくはこちら</DetailLink>
        </Link>
        <Map>[Google Map挿入場所]</Map>
      </Main>
    </Layout>
  );
};

export default PostDetail;

export const getServerSidePaths = async () => {
  const fetchData = await fetch(
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&large_area=Z011`
  )
    .then(res => res.json())
    .catch(() => null);
  const paths = fetchData.results.shop.map(
    fetchData => `/posts/${fetchData.id}`
  );
  return { paths, fallback: false };
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  const fetchData = await fetch(
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&large_area=Z011`
  )
    .then(res => res.json())
    .catch(() => null);
  const data = fetchData.results.shop.find(fetchData => fetchData.id == id);
  console.log('data', data);
  return {
    props: {
      data,
    },
  };
}