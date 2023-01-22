import CategoryCard from "@/components/CategoryCard";
import BoxIcon from "@/icons/BoxIcon";
import QuizIcon from "@/icons/QuizIcon";
import { getCategories, lookupCategory } from "@/lib/opentdb";
import { Category, CategoryWithCount } from "@/models";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

interface HomePageProps {
  categories: CategoryWithCount[];
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
        <div className={styles.hero}>
          <div className={styles.content}>
            <h3 className={styles.headline}>Quiz me</h3>
            <p className={styles.subheadline}>
              From history to pop culture, put your smarts to the test with this
              trivia quiz!
            </p>
          </div>
          <div className={styles.illustration}>
            <QuizIcon />
          </div>
        </div>
        <section className={styles.list}>
          {categories.map((category: CategoryWithCount) => (
            <CategoryCard key={category.id} {...category} icon={<BoxIcon />} />
          ))}
        </section>
      </main>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const { data } = await getCategories();
  const categories: CategoryWithCount[] = await Promise.all(
    data.trivia_categories.map(async (category: Category) => {
      const { data } = await lookupCategory(category.id);
      return {
        ...category,
        questionCount: data.category_question_count.total_easy_question_count,
      };
    })
  );
  return {
    props: {
      categories,
    },
  };
};
