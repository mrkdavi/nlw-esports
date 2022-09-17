import { useState } from "react";
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";
import { Loading } from "../Loading";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCoping, setIsCoping] = useState(false);

  const handleCopyDiscordToClipboard = async () => {
    setIsCoping(true);
    await Clipboard.setStringAsync(discord);
    setIsCoping(false);
    Alert.alert(
      "Discord copiado!",
      "Usuário copiado para a área de transferência."
    );
  };

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={38}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's Play"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no seu Discord</Text>
          <TouchableOpacity
            onPress={handleCopyDiscordToClipboard}
            style={styles.discordButton}
            disabled={isCoping}
          >
            <Text style={styles.discord}>
              {isCoping ? <Loading /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
