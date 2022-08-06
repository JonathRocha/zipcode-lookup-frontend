import { Form } from "@/components/form";
import { History } from "@/components/history";
import { searchHistory } from "@/hooks/useAddressSearch";
import { useReactiveVar } from "@apollo/client";

import "@/pages/home/styles.scss";

export const Home = () => {
  const addressHistory = useReactiveVar(searchHistory);

  return (
    <section className="home-page">
      <Form />
      {addressHistory.length > 0 && <History />}
    </section>
  );
};
