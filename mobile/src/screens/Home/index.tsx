import { useEffect, useState } from "react";
import { Image, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { GameCard, Game } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { Background } from "../../components/Background";
import { RouteParams } from "../../@types/navigation";

export function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({ id, name, bannerUrl }: RouteParams) {
    navigation.navigate("ads", { id, name, bannerUrl });
  }

  useEffect(() => {
    fetch("http://192.168.0.111:3000/games")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image source={logoImg} style={styles.logo} />
          <Heading
            title="Encontre seu duo!"
            subtitle="Selecione o game que deseja jogar..."
          />

          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GameCard data={item} onPress={() => handleOpenGame(item)} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}
