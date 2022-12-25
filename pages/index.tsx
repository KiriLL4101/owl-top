import { Button } from "../components";
import Rating from "../components/Rating/Rating";

export default function Home() {
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
