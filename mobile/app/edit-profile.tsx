/**
 * Edit Profile Screen — Form to update user profile information.
 */
import Avatar from "@/components/ui/Avatar";
import Header from "@/components/ui/Header";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { DUMMY_USER } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const [form, setForm] = useState({
    name: DUMMY_USER.name,
    title: DUMMY_USER.title,
    email: DUMMY_USER.email,
    phone: DUMMY_USER.phone,
    location: DUMMY_USER.location,
    bio: DUMMY_USER.bio,
  });

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully.",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Edit Profile" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar section */}
        <View style={styles.avatarSection}>
          <Avatar name={form.name} size={90} />
          <ThemedButton
            title="Change Photo"
            variant="ghost"
            size="sm"
            onPress={() => {}}
          />
        </View>

        {/* Form */}
        <ThemedInput
          label="Full Name"
          value={form.name}
          onChangeText={update("name")}
          leftIcon={<FontAwesome name="user" size={16} color={Colors.muted} />}
        />
        <ThemedInput
          label="Professional Title"
          value={form.title}
          onChangeText={update("title")}
          leftIcon={
            <FontAwesome name="briefcase" size={16} color={Colors.muted} />
          }
        />
        <ThemedInput
          label="Email"
          value={form.email}
          onChangeText={update("email")}
          keyboardType="email-address"
          leftIcon={
            <FontAwesome name="envelope" size={14} color={Colors.muted} />
          }
        />
        <ThemedInput
          label="Phone"
          value={form.phone}
          onChangeText={update("phone")}
          keyboardType="phone-pad"
          leftIcon={<FontAwesome name="phone" size={16} color={Colors.muted} />}
        />
        <ThemedInput
          label="Location"
          value={form.location}
          onChangeText={update("location")}
          leftIcon={
            <FontAwesome name="map-marker" size={16} color={Colors.muted} />
          }
        />
        <ThemedInput
          label="Bio"
          value={form.bio}
          onChangeText={update("bio")}
          multiline
          numberOfLines={4}
          leftIcon={
            <FontAwesome name="pencil" size={16} color={Colors.muted} />
          }
        />

        <View style={styles.actions}>
          <ThemedButton
            title="Save Changes"
            onPress={handleSave}
            fullWidth
            size="lg"
          />
          <ThemedButton
            title="Cancel"
            variant="ghost"
            onPress={() => router.back()}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  avatarSection: { alignItems: "center", paddingVertical: 20, gap: 8 },
  actions: { gap: 10, marginTop: 16 },
});
