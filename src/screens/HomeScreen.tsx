import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { homeNavigationItems } from "../navigation/homeNavigation";
import { Icon } from "../ui";

const overview = [
  { label: "Số tòa nhà", value: "1" },
  { label: "Số người thuê", value: "15" },
  { label: "Số phòng", value: "9" },
  { label: "Số phòng trống", value: "1" }
] as const;

const quickAccess = [
  { icon: "dollar", label: "T.Toán", featured: true },
  { icon: "bar-chart", label: "Báo cáo", featured: false },
  { icon: "calendar", label: "Lịch xem", featured: false },
  { icon: "line-chart", label: "Thống kê", featured: false }
] as const;

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerCircle} />
        <Text style={styles.greeting}>Xin chào</Text>
        <Text style={styles.brand}>SmartChủ</Text>
      </View>
      <View style={styles.overviewCard}>
        {overview.map((item, index) => <View key={item.label} style={[styles.overviewItem, index > 0 && styles.overviewDivider]}>
          <Text style={[styles.overviewValue, index === 0 || index === 3 ? styles.accentText : undefined]}>{item.value}</Text>
          <Text style={styles.overviewLabel}>{item.label}</Text>
        </View>)}
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Truy cập nhanh</Text>
        <View style={styles.quickGrid}>
          {quickAccess.map((item) => <View key={item.label} style={[styles.quickCard, item.featured && styles.featuredCard]}>
            <View style={[styles.quickIcon, item.featured && styles.featuredIcon]}><Icon color={item.featured ? colors.surface : colors.accent} name={item.icon} size={22} /></View>
            <Text style={styles.quickLabel}>{item.label}</Text>
          </View>)}
        </View>
      </View>
      <View style={styles.spacer} />
      <View accessibilityRole="tablist" style={styles.navigation}>
        {homeNavigationItems.map((item) => <View accessibilityRole="tab" accessibilityState={{ selected: item.active === true }} key={item.label} style={[styles.navigationItem, item.active && styles.activeNavigationItem]}>
          <Icon color={item.active ? colors.accent : colors.navigationMuted} name={item.icon} size={22} />
          <Text numberOfLines={1} style={[styles.navigationLabel, item.active && styles.activeNavigationLabel]}>{item.label}</Text>
        </View>)}
      </View>
    </SafeAreaView>
  );
}

const colors = { accent: "#B84F0B", border: "#F0E5D6", header: "#F7941D", navigationMuted: "#75695D", primaryText: "#382919", screen: "#FFF9EF", surface: "#FFFFFF", softAccent: "#FFF1DA", softSurface: "#FFF4DC", subduedText: "#7B664F" } as const;

const styles = StyleSheet.create({
  accentText: { color: colors.accent }, activeNavigationItem: { backgroundColor: colors.softAccent }, activeNavigationLabel: { color: colors.accent, fontWeight: "800" },
  brand: { color: colors.surface, fontSize: 34, fontWeight: "800", letterSpacing: -1.3, lineHeight: 39 }, content: { gap: 14, paddingHorizontal: 20, paddingTop: 24 }, featuredCard: { backgroundColor: colors.softSurface }, featuredIcon: { backgroundColor: colors.header },
  greeting: { color: "rgba(255,255,255,0.86)", fontSize: 14, fontWeight: "500", lineHeight: 20 }, header: { backgroundColor: colors.header, height: 220, justifyContent: "flex-end", overflow: "hidden", paddingBottom: 28, paddingHorizontal: 24, position: "relative" }, headerCircle: { backgroundColor: "rgba(255,255,255,0.10)", borderRadius: 125, height: 250, position: "absolute", right: -74, top: -106, width: 250 },
  navigation: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, flexDirection: "row", gap: 2, minHeight: 72, paddingBottom: 8, paddingHorizontal: 10, paddingTop: 8 }, navigationItem: { alignItems: "center", borderRadius: 16, flex: 1, gap: 3, justifyContent: "center", minWidth: 0 }, navigationLabel: { color: colors.navigationMuted, fontSize: 11, fontWeight: "600", letterSpacing: -0.2 },
  overviewCard: { backgroundColor: colors.surface, borderColor: "rgba(104,53,0,0.07)", borderRadius: 24, borderWidth: 1, flexDirection: "row", marginHorizontal: 20, marginTop: -24, paddingHorizontal: 6, paddingVertical: 18, shadowColor: "#753500", shadowOffset: { height: 14, width: 0 }, shadowOpacity: 0.11, shadowRadius: 32 }, overviewDivider: { borderLeftColor: colors.border, borderLeftWidth: 1 }, overviewItem: { alignItems: "center", flex: 1, gap: 7, minWidth: 0, paddingHorizontal: 4 }, overviewLabel: { color: colors.subduedText, fontSize: 10, fontWeight: "600", lineHeight: 14, textAlign: "center" }, overviewValue: { color: colors.primaryText, fontSize: 25, fontWeight: "800", lineHeight: 25 },
  quickCard: { alignItems: "center", backgroundColor: colors.surface, borderColor: "rgba(104,53,0,0.08)", borderRadius: 21, borderWidth: 1, flex: 1, flexDirection: "row", gap: 12, height: 88, padding: 14, shadowColor: "#753500", shadowOffset: { height: 8, width: 0 }, shadowOpacity: 0.06, shadowRadius: 20 }, quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 }, quickIcon: { alignItems: "center", backgroundColor: "#FFE4BD", borderRadius: 15, height: 42, justifyContent: "center", width: 42 }, quickLabel: { color: "#5E4229", flexShrink: 1, fontSize: 13, fontWeight: "700", lineHeight: 17 },
  screen: { backgroundColor: colors.screen, flex: 1 }, sectionTitle: { color: colors.primaryText, fontSize: 17, fontWeight: "800", letterSpacing: -0.3, lineHeight: 24 }, spacer: { flex: 1 }
});
