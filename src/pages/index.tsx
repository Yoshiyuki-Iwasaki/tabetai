import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Layout from "../components/Layout";

const Home = ({ data }) => {
  const {
    results_available = 0,
    results_start = 1,
    shop: defaultShops = [],
  } = data.results;

  //取得した店舗データを格納
  const [shop, updateShops] = useState(defaultShops);

  //取得したページデータを格納
  const [page, updatePage] = useState({
    results_available: results_available,
    results_start: results_start,
  });

  // 開始位置の変更を監視
  useEffect(() => {
    if (page.results_start === 1) return;

    const params = { start: page.results_start };
    const query = new URLSearchParams(params);

    const request = async () => {
      const res = await fetch(`/api/search?${query}`);
      const data = await res.json();
      const nextData = data.results;

      updatePage({
        results_available: nextData.results_available,
        results_start: nextData.results_start,
      });

      if (nextData.results_start === 1) {
        updateShops(nextData.shop);
        return;
      }

      updateShops(prev => {
        return [...prev, ...nextData.shop];
      });
    };

    request();
  }, [page.results_start]);

  // もっと読むボタンを押したときの処理
  const handlerOnClickReadMore = () => {
    if (page.results_available <= page.results_start) return;

    updatePage(prev => {
      return {
        ...prev,
        results_start: prev.results_start + 1,
      };
    });
  };
  return (
    <Layout>
      <List>
        {shop.map((data, index) => (
          <ListItem key={index}>
            <Link href={`/post/${data.id}`} as={`/post/${data.id}`} passHref>
              <ListLink>
                <figure>
                  <Image src={data.logo_image} width={65} height={69} alt="" />
                </figure>
                <TextArea>
                  <Title>{data.name}</Title>
                  <Text>{data.catch}</Text>
                </TextArea>
              </ListLink>
            </Link>
          </ListItem>
        ))}
      </List>
      <button onClick={handlerOnClickReadMore}>もっと読む</button>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  const data = await fetch(
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&large_area=Z011`
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      data,
    },
  };
}


const List = styled.ul``;

const ListItem = styled.li`
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
`;

const ListLink = styled.a`
  display: flex;
`;

const TextArea = styled.div`
  padding-left: 10px;
  width: calc(100% - 69px);
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.3;
`;