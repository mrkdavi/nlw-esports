import { useEffect, useState, FormEvent } from "react";
import { Check, GameController } from "phosphor-react";
import axios from "axios";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Input } from "./Form/Input";
import { Game } from "../App";

interface FormAd {
  name: string
  yearsPlaying: string,
  discord: string,
  hourStart: string,
  hourEnd: string,
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  const DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

  useEffect(() => {
    axios("http://localhost:3000/games").then((res) => setGames(res.data));
  }, []);

  const handleCreateAd = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!weekDays.length) {
      alert("Selecione pelo menos um dia da semana");
      return
    }
    console.log('entrei')

    const ad = {
      name: data.name,
      yearsPlaying: +data.yearsPlaying,
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hoursStart,
      hourEnd: data.hoursEnd,
      useVoiceChannel: useVoiceChannel
    }

    axios.post(`http://localhost:3000/games/${data.game}/ads`, ad)
    .then(() => alert("Anúncio criado com sucesso!"))
    .catch(() => alert("Erro ao criar anúncio!"));
    
    console.log(ad);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl text-white font-black">
          Publique um anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:zinc-500 appearance-none"
              defaultValue=""
              required
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Como te chamam dentro do game?"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                required
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                id="discord"
                name="discord"
                type="text"
                required
                placeholder="usuário#0000"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                {DAYS.map((day, i) => (
                  <ToggleGroup.Item
                    key={i}
                    value={`${i}`}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes(`${i}`)
                        ? "bg-violet-500"
                        : "bg-zinc-900"
                    }`}
                  >
                    {day}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="hoursStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="hoursStart"
                  name="hoursStart"
                  type="time"
                  required
                  placeholder="De"
                />
                <Input
                  id="hoursEnd"
                  name="hoursEnd"
                  type="time"
                  required
                  placeholder="Até"
                />
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              id="useVoice"
              checked={useVoiceChannel}
              onCheckedChange={() => setUseVoiceChannel(!useVoiceChannel)}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="useVoice">Costumo me conectar ao chat de voz</label>
          </div>
          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController width={24} height={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
