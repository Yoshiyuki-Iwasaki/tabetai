import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components';
import Layout from "../components/Layout";

const List = styled.ul`
  margin: 0 15px;
`;

const ListItem = styled.li`
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
`;

const Link = styled.a`
  display: flex;
`;

const TextArea = styled.div`
  padding-left: 10px;
  width: calc(100% - 69px);
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.4;
`;

const Home = ({ data }) => {
  return (
    <Layout>
      <List>
        {data.results.shop.map((data, index) => (
          <ListItem key={index}>
            <Link href={`/post/${data.id}`}>
              <figure>
                <Image src={data.logo_image} width={65} height={69} alt="" />
              </figure>
              <TextArea>
                <Title>{data.name}</Title>
                <Text>テストテスト</Text>
              </TextArea>
            </Link>
          </ListItem>
        ))}
      </List>
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