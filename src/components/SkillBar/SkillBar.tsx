// components/SkillBar/SkillBar.tsx
"use client";
import React from "react";
import styles from "./SkillBar.module.css";

type Props = {
  label: string;
  value: number; // 0 a 100
};

export default function SkillBar({ label, value }: Props) {
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div className={styles.row} aria-label={`Skill ${label} ${pct}%`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
        <span className={styles.badge}>{pct}%</span>
      </div>
    </div>
  );
}