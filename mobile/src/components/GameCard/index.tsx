import { LinearGradient } from "expo-linear-gradient";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground,
  Text,
} from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";
export interface Game {
  id: string;
  name: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

interface Props extends TouchableOpacityProps {
  data: Game;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.ads}>{data._count.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
