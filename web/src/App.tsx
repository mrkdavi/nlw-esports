import "./styles/main.css";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
// import "dotenv/config";

import logoImg from "./assets/logo-nlw-esports.svg";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

export interface Game {
  id: number;
  name: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  // const { REACT_APP_API_URL } = process.env;
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    // fetch(`${REACT_APP_API_URL}/games`)
    axios("http://localhost:3000/games").then((res) => setGames(res.data));
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
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
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
