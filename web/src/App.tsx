import "./styles/main.css";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useKeenSlider } from "keen-slider/react";

import { GameBanner } from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { CreateAdBanner } from "./components/CreateAdBanner";

import logoImg from "./assets/logo-nlw-esports.svg";
import "keen-slider/keen-slider.min.css";

export interface Game {
  id: number;
  name: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 6,
      spacing: 15,
    },
  });

  useEffect(() => {
    axios(`http://localhost:3000/games`).then((res) => setGames(res.data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          {" duo "}
        </span>
        está aqui.
      </h1>
      <div ref={ref} className="keen-slider mt-16">
        {games
          .map((game) => (
            <GameBanner
              className="keen-slider__slide"
              key={game.id}
              name={game.name}
              bannerUrl={game.bannerUrl}
              adsCont={game._count.ads}
            />
          ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
