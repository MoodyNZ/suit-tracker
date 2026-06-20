import { useState } from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import { Insight } from "../../schemas/insight.ts";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps & {
  onCreate?: (insight: Insight) => void;
};

export const AddInsight = ({ onCreate, ...props }: AddInsightProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addInsight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Using fetch submission instead of native browser form submission
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: formData.get("brand"),
          text: formData.get("text"),
        }),
      });
      if (response.ok) {
        const insight = Insight.parse(await response.json());
        onCreate?.(insight);
        props.onClose();
      } else {
        // ToDo: Handle error
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label htmlFor="brand" className={styles.field}>
          Brand
          <select name="brand" className={styles["field-input"]}>
            {BRANDS.map(({ id, name }) => <option key={id} value={id}>
              {name}
            </option>)}
          </select>
        </label>
        <label htmlFor="text" className={styles.field}>
          Insight
          <textarea
            name="text"
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
          />
        </label>
        <Button
          className={styles.submit}
          type="submit"
          label="Add insight"
          disabled={isSubmitting}
          autoFocus
        />
      </form>
    </Modal>
  );
};
