import { Icon as AntIcon } from "@ant-design/react-native";
import type { OutlineGlyphMapType } from "@ant-design/icons-react-native";

type Props = { color: string; name: OutlineGlyphMapType; size?: number };

// Keep vendor UI imports behind the app-level UI boundary.
export function Icon({ color, name, size = 22 }: Props) {
  return <AntIcon color={color} name={name} size={size} />;
}
