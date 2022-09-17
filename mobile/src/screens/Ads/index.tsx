import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteParams } from "../../@types/navigation";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Loading } from "../../components/Loading";
import { DuoMatch } from "../../components/DuoMatch";

export function Ads() {
  const route = useRoute();
  const game = route.params as RouteParams;

  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  const navigation = useNavigation();

  const handleGoBackHome = () => {
    navigation.navigate("home");
  };

  const getDiscordUser = (adId: string) => {
    fetch(`http://192.168.0.111:3000/ads/${adId}/discord`)
      .then((res) => res.json())
      .then((data) => setDiscordDuoSelected(data.discord));
  };

  useEffect(() => {
    fetch(`http://192.168.0.111:3000/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => setAds(data))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <Background>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBackHome}>
              <Entypo
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>

            <Image source={logoImg} style={styles.logo} />
            <View style={styles.right} />
          </View>
          <Image
            source={{ uri: game.bannerUrl }}
            style={styles.banner}
            resizeMode="cover"
          />

          <Heading title={game.name} subtitle="Conecte-se e comece a jogar!" />
          {!isLoading ? (
            <FlatList
              data={ads}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DuoCard
                  data={item}
                  onConnect={() => {
                    getDiscordUser(item.id);
                  }}
                />
              )}
              style={styles.containerList}
              contentContainerStyle={
                ads.length > 0 ? styles.contentList : styles.emptyListContent
              }
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={() => (
                <Text style={styles.emptyListText}>
                  Não há anúncios para esse jogo no momento.
                </Text>
              )}
              horizontal
            />
          ) : (
            <Loading />
          )}

          <DuoMatch
            discord={discordDuoSelected}
            visible={discordDuoSelected.length > 0}
            onClose={() => setDiscordDuoSelected("")}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}
