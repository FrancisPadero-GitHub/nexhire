/**
 * Interview Tab Screen — Entry point for the AI interview module.
 * Shows interview status, past interviews, and CTA to start new interview.
 */
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ThemedButton from "@/components/ui/ThemedButton";
import { Colors, Shadows } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dummy past interview data
const PAST_INTERVIEWS = [
  {
    id: "int_1",
    date: "Feb 18, 2025",
    role: "Senior Frontend Developer",
    score: 87,
    status: "Completed",
    duration: "18 min",
    questions: 5,
  },
  {
    id: "int_2",
    date: "Feb 10, 2025",
    role: "Full Stack Engineer",
    score: 72,
    status: "Completed",
    duration: "22 min",
    questions: 5,
  },
];

export default function InterviewScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Text style={styles.title}>AI Interview</Text>
        <Text style={styles.subtitle}>
          Practice and get scored by our AI interviewer
        </Text>

        {/* Start Interview CTA */}
        <View style={styles.ctaCard}>
          <View style={styles.ctaIcon}>
            <FontAwesome name="microphone" size={32} color={Colors.accent} />
          </View>
          <Text style={styles.ctaTitle}>Ready for Your Interview?</Text>
          <Text style={styles.ctaDescription}>
            Our AI will conduct a voice-based interview tailored to your
            profile. Get instant scoring and actionable feedback.
          </Text>
          <View style={styles.ctaFeatures}>
            <FeatureItem icon="clock-o" text="15–25 min session" />
            <FeatureItem icon="question-circle" text="5 adaptive questions" />
            <FeatureItem icon="bar-chart" text="Instant score & feedback" />
          </View>
          <ThemedButton
            title="Start New Interview"
            onPress={() => router.push("/interview-instructions")}
            variant="accent"
            size="lg"
            fullWidth
            icon={<FontAwesome name="play" size={16} color="#FFF" />}
          />
        </View>

        {/* How It Works */}
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsRow}>
          <StepCard
            number="1"
            title="Prepare"
            description="Review instructions & tips"
          />
          <StepCard
            number="2"
            title="Interview"
            description="Answer AI voice questions"
          />
          <StepCard
            number="3"
            title="Results"
            description="Get your score report"
          />
        </View>

        {/* Past Interviews */}
        <Text style={styles.sectionTitle}>Past Interviews</Text>
        {PAST_INTERVIEWS.map((interview) => (
          <Card
            key={interview.id}
            onPress={() => router.push("/score-summary")}
            style={styles.interviewCard}
          >
            <View style={styles.interviewTop}>
              <View>
                <Text style={styles.interviewRole}>{interview.role}</Text>
                <Text style={styles.interviewDate}>{interview.date}</Text>
              </View>
              <View style={styles.interviewScore}>
                <Text style={styles.interviewScoreValue}>
                  {interview.score}
                </Text>
                <Text style={styles.interviewScoreLabel}>/100</Text>
              </View>
            </View>
            <View style={styles.interviewMeta}>
              <Badge label={interview.status} variant="success" size="sm" />
              <Text style={styles.metaText}>{interview.duration}</Text>
              <Text style={styles.metaText}>
                {interview.questions} questions
              </Text>
            </View>
          </Card>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureItem({
  icon,
  text,
}: {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  text: string;
}) {
  return (
    <View style={styles.featureItem}>
      <FontAwesome name={icon} size={14} color={Colors.secondary} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDesc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: Colors.text.secondary, marginBottom: 20 },
  // ── CTA Card
  ctaCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.md,
  },
  ctaIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${Colors.accent}12`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  ctaDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 16,
  },
  ctaFeatures: { width: "100%", gap: 8, marginBottom: 20 },
  featureItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  featureText: { fontSize: 13, color: Colors.text.secondary },
  // ── Steps
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 14,
  },
  stepsRow: { flexDirection: "row", gap: 10, marginBottom: 28 },
  stepCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  stepNumberText: { fontSize: 14, fontWeight: "700", color: "#FFF" },
  stepTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  stepDesc: { fontSize: 11, color: Colors.text.secondary, textAlign: "center" },
  // ── Past Interviews
  interviewCard: { marginBottom: 12 },
  interviewTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  interviewRole: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  interviewDate: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  interviewScore: { flexDirection: "row", alignItems: "baseline" },
  interviewScoreValue: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.success,
  },
  interviewScoreLabel: { fontSize: 12, color: Colors.muted },
  interviewMeta: { flexDirection: "row", alignItems: "center", gap: 12 },
  metaText: { fontSize: 12, color: Colors.text.secondary },
});
