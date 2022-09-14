import { View, Image, ScrollView, FlatList } from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { GAMES } from "../../utils/games";

import { styles } from "./styles";

export function Home() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={GAMES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GameCard data={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
        {/* {[...GAMES].map((game) => (
          <GameCard
            key={game.id}
            data={{
              id: game.id,
              ads: game.ads,
              name: game.name,
              cover: game.cover,
            }}
          />
        ))} */}
      </View>
    </ScrollView>
  );
}
