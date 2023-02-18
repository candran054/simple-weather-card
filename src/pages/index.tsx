import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Card } from "./card";

export default function Home() {
  return (
    <>
      <main className="bg-slate-700 h-screen flex items-center justify-center">
        <Card />
      </main>
    </>
  );
}
