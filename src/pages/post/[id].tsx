import React from 'react'
import styled from "styled-components";
import Layout from "../../components/Layout";

const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
`;

const PostDetail = ({ data }) => {
  return (
    <Layout>
      <main>
        <figure>
          <img src={data.photo.mobile.l} />
        </figure>
        <Title>{data.name}</Title>
        <p>{data.catch}</p>
        <p>住所:{data.address}</p>
        <p>アクセス:{data.access}</p>
        <a href={data.urls.pc}>詳しくはこちら</a>

        <p>[Google Map挿入場所]</p>
      </main>
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