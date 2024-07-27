/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const set_up = async (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    set_up(localStorage.getItem("user_id")!);
  }, [navigate]);

  return (
    <Layout>
      <section></section>
    </Layout>
  );
};

export default Home;
