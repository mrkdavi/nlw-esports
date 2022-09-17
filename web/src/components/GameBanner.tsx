interface GameBannerProps {
  name: string;
  bannerUrl: string;
  adsCont: number
  className?: string;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a className={`relative rounded-lg overflow-hidden ${props.className}`}>
      <img src={props.bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0">
        <strong className="font-bold text-white block">{props.name}</strong>
        <span className="text-zinc-300 text-sm block">{props.adsCont} anúncio(s)</span>
      </div>
    </a>
  );
}
