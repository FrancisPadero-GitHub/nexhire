/**
 * Login Screen — Email/password authentication with social login options.
 * Includes form validation, password visibility toggle, and navigation links.
 */
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [loading, setLoading] = useState(false);

  // Basic form validation
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate login delay, then navigate to main app
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login → navigate to dashboard
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo / Brand Header */}
        <View style={styles.header}>
          <Text style={styles.brandName}>NexHire</Text>
          <Text style={styles.tagline}>Welcome back! Sign in to continue.</Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <ThemedInput
            label="Email Address"
            placeholder="you@example.com"
            leftIcon="envelope"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <ThemedInput
            label="Password"
            placeholder="Enter your password"
            leftIcon="lock"
            isPassword
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          {/* Forgot password link */}
          <Pressable
            onPress={() => router.push("/(auth)/forgot-password")}
            style={styles.forgotLink}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>

          {/* Login button */}
          <ThemedButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            size="lg"
          />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social login buttons */}
        <View style={styles.socialRow}>
          <Pressable
            style={styles.socialButton}
            onPress={() => handleSocialLogin("google")}
          >
            <FontAwesome name="google" size={20} color="#DB4437" />
            <Text style={styles.socialLabel}>Google</Text>
          </Pressable>

          <Pressable
            style={styles.socialButton}
            onPress={() => handleSocialLogin("linkedin")}
          >
            <FontAwesome name="linkedin-square" size={22} color="#0A66C2" />
            <Text style={styles.socialLabel}>LinkedIn</Text>
          </Pressable>
        </View>

        {/* Sign up link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Pressable onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: "center", marginTop: "25%" }}>
          <Pressable
            onPress={() => router.push("/onboarding")}
            style={styles.backButton}
          >
            <FontAwesome name="chevron-left" size={16} color={Colors.primary} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${Colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  brandName: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: Colors.text.secondary,
    marginTop: 8,
  },
  form: {
    marginBottom: 24,
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: -8,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.secondary,
    fontWeight: "500",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: Colors.muted,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.secondary,
  },
});
