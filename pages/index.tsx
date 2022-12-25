import { Button } from "../components";
import Rating from "../components/Rating/Rating";
import { withLayout } from "../layout/Layout";

function Home() {
  return (
    <>
      <main>
        <Button variant="ghost" arrow="right">
          Кнопка
        </Button>
        <Rating rating={4} />
      </main>
    </>
  );
}

export default withLayout(Home);
