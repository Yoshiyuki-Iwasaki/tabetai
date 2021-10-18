import Head from 'next/head'
import Image from 'next/image'

const Home = ({ data }) => {
  return (
    <>
      <h1>tabetai</h1>
      <ul>
        {data.results.shop.map((data, index) => (
          <li key={index}>
            <a href={`/post/${data.id}`}>
              <figure>
                <img src={data.logo_image} alt="" />
              </figure>
              <h2>{data.name}</h2>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getServerSideProps() {
  const defaultEndpoint = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&large_area=Z011`;
  const res = await fetch(defaultEndpoint);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
export default Home;