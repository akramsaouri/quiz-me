import { getCategories } from "@/lib/opentdb";
import { Category } from "@/models";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

interface HomePageProps {
  categories: Category[];
}

const HomePage: NextPage<HomePageProps> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Quiz me</title>
        <meta name="description" content="Quiz me, dont quizz me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {categories.map((category: Category) => (
          <Link key={category.id} href={`/trivia/${category.id}`}>
            {category.name}
          </Link>
        ))}
      </main>
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  req,
  res,
}) => {
  const { data } = await getCategories();
  return {
    props: {
      categories: data.trivia_categories,
    },
  };
};
