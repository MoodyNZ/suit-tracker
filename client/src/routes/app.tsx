import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import { z } from "zod";
import { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    fetch(`/api/insights`)
      .then((res) => res.json())
      .then((data) => setInsights(z.array(Insight).parse(data)));
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Insights className={styles.insights} insights={insights} />
    </main>
  );
};
