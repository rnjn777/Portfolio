/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function GitHubActivity() {
  const username = personalInfo.github.split("/").pop() || "ranjankumar";

  return (
    <section id="github" className="py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase text-[var(--accent-cyan)] mb-3 block">
            Open Source
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold">
            GitHub{" "}
            <span className="gradient-text">activity</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-1 rounded-xl overflow-hidden"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=00d4ff&text_color=9ca3af&icon_color=a855f7&bg_color=0a0a0f`}
              alt="GitHub Stats"
              className="w-full"
              loading="lazy"
            />
          </motion.div>

          {/* Top languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass p-1 rounded-xl overflow-hidden"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=00d4ff&text_color=9ca3af&bg_color=0a0a0f`}
              alt="Top Languages"
              className="w-full"
              loading="lazy"
            />
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="sm:col-span-2 glass p-1 rounded-xl overflow-hidden"
          >
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&hide_border=true&stroke=1a1a2e&ring=00d4ff&fire=a855f7&currStreakLabel=00d4ff&sideLabels=9ca3af&dates=4b5563&background=0a0a0f`}
              alt="GitHub Streak"
              className="w-full"
              loading="lazy"
            />
          </motion.div>

          {/* Contribution graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="sm:col-span-2 glass p-1 rounded-xl overflow-hidden"
          >
            <img
              src={`https://ghchart.rshah.org/00d4ff/${username}`}
              alt="Contribution Graph"
              className="w-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
