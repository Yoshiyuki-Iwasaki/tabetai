import React from 'react'
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../../components/Layout";
import GoogleMapReact from "google-map-react";

const PostDetail = ({ data }) => {
  const defaultLatLng = {
    lat: data.lat,
    lng: data.lng,
  };

  const handleApiLoaded = ({ map, maps }) => {
    new maps.Marker({
      map,
      position: defaultLatLng,
    });
  };

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
        <Link href={data.urls.pc} as={data.urls.pc} passHref>
          <DetailLink>詳しくはこちら</DetailLink>
        </Link>
        <Map>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_Google_API_KEY }}
            defaultCenter={defaultLatLng}
            defaultZoom={16}
            onGoogleApiLoaded={handleApiLoaded}
          />
        </Map>
      </Main>
    </Layout>
  );
};

export default PostDetail;

export const getStaticPaths = async () => {
  const fetchData = await fetch(
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&large_area=Z011`
  )
    .then(res => res.json())
    .catch(() => null);
  const paths = fetchData.results.shop.map(
    fetchData => `/post/${fetchData.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const fetchData = await fetch(
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&large_area=Z011`
  )
    .then(res => res.json())
    .catch(() => null);
  const array = fetchData.results.shop.find(fetchData => fetchData.id == id);
  return {
    props: {
      data: array,
    },
  };
};

const Main = styled.div``;

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
  margin-top: 15px;
  font-size: 13px;
  line-height: 1.3;
`;
const Address = styled.p`
  margin-top: 15px;
  font-size: 13px;
  line-height: 1.3;
`;
const Access = styled.p`
  margin-top: 15px;
  font-size: 13px;
  line-height: 1.3;
`;

const DetailLink = styled.a`
  margin-top: 30px;
  display: inline-block;
  border-bottom: 1px solid #333;
  font-size: 13px;
  line-height: 1.3;
`;

const Map = styled.div`
  margin: 30px auto 0;
  width: 300px;
  height: 300px;
`;