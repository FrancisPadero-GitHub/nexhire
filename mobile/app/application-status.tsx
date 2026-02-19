/**
 * Application Status Screen — Track submitted job applications.
 */
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Header from "@/components/ui/Header";
import { DUMMY_APPLICATIONS } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const statusConfig: Record<
  string,
  {
    color: string;
    icon: React.ComponentProps<typeof FontAwesome>["name"];
    variant: "success" | "warning" | "danger" | "info";
  }
> = {
  Applied: { color: Colors.secondary, icon: "paper-plane", variant: "info" },
  "Under Review": { color: Colors.warning, icon: "eye", variant: "warning" },
  Interview: {
    color: Colors.success,
    icon: "calendar-check-o",
    variant: "success",
  },
  Rejected: { color: Colors.danger, icon: "times-circle", variant: "danger" },
  Offered: { color: Colors.success, icon: "check-circle", variant: "success" },
};

export default function ApplicationStatusScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="My Applications" />
      <FlatList
        data={DUMMY_APPLICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              {DUMMY_APPLICATIONS.length} application
              {DUMMY_APPLICATIONS.length !== 1 ? "s" : ""} submitted
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const config = statusConfig[item.status] || statusConfig.Applied;
          return (
            <View style={styles.card}>
              {/* Header row */}
              <View style={styles.cardHeader}>
                <Avatar name={item.company} size={42} />
                <View style={styles.cardInfo}>
                  <Text style={styles.jobTitle}>{item.position}</Text>
                  <Text style={styles.company}>{item.company}</Text>
                </View>
                <Badge text={item.status} variant={config.variant} size="sm" />
              </View>

              {/* Timeline */}
              <View style={styles.timeline}>
                <TimelineStep
                  label="Applied"
                  date={item.appliedDate}
                  active
                  completed
                />
                <TimelineStep
                  label="Reviewed"
                  date={item.status !== "Applied" ? "In progress" : undefined}
                  active={item.status !== "Applied"}
                  completed={["Interview", "Offered"].includes(item.status)}
                />
                <TimelineStep
                  label="Interview"
                  date={item.status === "Interview" ? "Scheduled" : undefined}
                  active={
                    item.status === "Interview" || item.status === "Offered"
                  }
                  completed={item.status === "Offered"}
                />
                <TimelineStep
                  label="Decision"
                  active={
                    item.status === "Offered" || item.status === "Rejected"
                  }
                  completed={item.status === "Offered"}
                  isLast
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <FontAwesome name="folder-open-o" size={40} color={Colors.border} />
            <Text style={styles.emptyText}>No applications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function TimelineStep({
  label,
  date,
  active = false,
  completed = false,
  isLast = false,
}: {
  label: string;
  date?: string;
  active?: boolean;
  completed?: boolean;
  isLast?: boolean;
}) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepDotCol}>
        <View
          style={[
            styles.stepDot,
            active && styles.stepDotActive,
            completed && styles.stepDotCompleted,
          ]}
        >
          {completed && <FontAwesome name="check" size={8} color="#FFF" />}
        </View>
        {!isLast && (
          <View style={[styles.stepLine, active && styles.stepLineActive]} />
        )}
      </View>
      <View style={styles.stepInfo}>
        <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>
          {label}
        </Text>
        {date && <Text style={styles.stepDate}>{date}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  summary: { paddingVertical: 12 },
  summaryText: { fontSize: 13, color: Colors.muted, fontWeight: "500" },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  cardInfo: { flex: 1 },
  jobTitle: { fontSize: 15, fontWeight: "600", color: Colors.text.primary },
  company: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
  timeline: { paddingLeft: 4 },
  stepContainer: { flexDirection: "row", gap: 12 },
  stepDotCol: { alignItems: "center", width: 16 },
  stepDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotActive: { backgroundColor: Colors.secondary },
  stepDotCompleted: { backgroundColor: Colors.success },
  stepLine: { width: 2, height: 24, backgroundColor: Colors.border },
  stepLineActive: { backgroundColor: Colors.secondary },
  stepInfo: { flex: 1, paddingBottom: 12 },
  stepLabel: { fontSize: 13, color: Colors.muted, fontWeight: "500" },
  stepLabelActive: { color: Colors.text.primary, fontWeight: "600" },
  stepDate: { fontSize: 11, color: Colors.text.secondary, marginTop: 2 },
  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 14, color: Colors.muted },
});
