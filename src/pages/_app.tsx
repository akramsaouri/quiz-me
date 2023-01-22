import "@/styles/globals.css";
import type { AppProps } from "next/app";
import styles from "../styles/Layout.module.scss";
import { Lato } from "@next/font/google";
import cn from "classnames";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cn(styles.container, lato.className)}>
      <div className={styles.content}>
        <Component {...pageProps} />
      </div>
      <footer className={styles.footer}>
        <p>
          Powered by{" "}
          <a
            href="https://opentdb.com/"
            target="_blank"
            rel="nooopener noreferrer"
          >
            https://opentdb.com/
          </a>
        </p>
      </footer>
    </div>
  );
}
