import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import { BRANDS } from "../../lib/consts.ts";
import type { Insight } from "../../schemas/insight.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
  onDeleted?: (id: Insight["id"]) => void;
};

export const Insights = ({ insights, className, onDeleted }: InsightsProps) => {
  const deleteInsight = async (id: Insight["id"]) => {
    const response = await fetch(`/api/insights/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      onDeleted?.(id);
    } else {
      // ToDo: Handle error
    }
  };

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length
          ? (
            insights.map(({ id, text, date, brandId }) => (
              <div className={styles.insight} key={id}>
                <div className={styles["insight-meta"]}>
                  <span>{BRANDS.find((b) => b.id === brandId)?.name}</span>
                  <div className={styles["insight-meta-details"]}>
                    <span>{new Date(date).toLocaleString()}</span>
                    <Trash2Icon
                      className={styles["insight-delete"]}
                      onClick={() => deleteInsight(id)}
                    />
                  </div>
                </div>
                <p className={styles["insight-content"]}>{text}</p>
              </div>
            ))
          )
          : <p>We have no insights!</p>}
      </div>
    </div>
  );
};
