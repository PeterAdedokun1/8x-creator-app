import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { campaigns } from '../../src/data/campaigns';
import { store } from '../../src/data/store';
import { Colors, FontSize, Spacing } from '../../src/constants/theme';
import { StatusBadge } from '../../src/components/StatusBadge';

export default function CampaignDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const campaign = campaigns.find((c) => c.id === id);
  const [videoUrl, setVideoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!campaign) {
    return (
      <View style={styles.centered}>
        <Text>Campaign not found</Text>
      </View>
    );
  }

  const existingSubmissions = store.getSubmissionsByCampaign(campaign.id);

  const handleSubmit = () => {
    const trimmed = videoUrl.trim();
    if (!trimmed) {
      Alert.alert('Missing URL', 'Please enter your video URL.');
      return;
    }

    const isValidUrl =
      trimmed.includes('tiktok.com') || trimmed.includes('instagram.com');
    if (!isValidUrl) {
      Alert.alert(
        'Invalid URL',
        'Please enter a valid TikTok or Instagram URL.'
      );
      return;
    }

    store.addSubmission(campaign.id, campaign.title, campaign.brand, trimmed);
    setSubmitted(true);
    setVideoUrl('');
  };

  const handleOpenVideo = (url: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!openedWindow) {
        Alert.alert('Error', 'Could not open video URL.');
      }
      return;
    }

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open video URL.');
    });
  };

  const daysLeft = Math.ceil(
    (new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: campaign.brand,
          headerBackTitle: 'Back',
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.heroSection}>
            <Pressable
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.backButtonPressed,
              ]}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={18}
                color={Colors.text}
              />
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
            <Text style={styles.logo}>{campaign.brandLogo}</Text>
            <Text style={styles.title}>{campaign.title}</Text>
            <Text style={styles.brand}>{campaign.brand}</Text>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>${campaign.payoutPerVideo}</Text>
                <Text style={styles.statLabel}>Per Video</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text
                  style={[
                    styles.statValue,
                    daysLeft <= 7 && { color: Colors.danger },
                  ]}
                >
                  {daysLeft > 0 ? `${daysLeft}d` : 'Expired'}
                </Text>
                <Text style={styles.statLabel}>Remaining</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {campaign.exampleVideos.length}
                </Text>
                <Text style={styles.statLabel}>Examples</Text>
              </View>
            </View>
          </View>

          {/* Brief */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Campaign Brief</Text>
            <View style={styles.briefCard}>
              <Text style={styles.briefText}>{campaign.brief}</Text>
            </View>
          </View>

          {/* Example Videos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Example Videos</Text>
            <Text style={styles.sectionSubtitle}>
              Watch these for reference before creating yours
            </Text>
            {campaign.exampleVideos.map((video) => (
              <Pressable
                key={video.id}
                style={({ pressed }) => [
                  styles.videoCard,
                  pressed && { opacity: 0.9 },
                ]}
                onPress={() => handleOpenVideo(video.url)}
              >
                <Image
                  source={{ uri: video.thumbnailUrl }}
                  style={styles.thumbnail}
                />
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoUrl} numberOfLines={1}>
                    {video.url.includes('tiktok') ? 'TikTok' : 'Instagram'}
                  </Text>
                </View>
                <Ionicons
                  name="play-circle-outline"
                  size={28}
                  color={Colors.primary}
                />
              </Pressable>
            ))}
          </View>

          {/* Existing Submissions */}
          {existingSubmissions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Submissions</Text>
              {existingSubmissions.map((sub) => (
                <View key={sub.id} style={styles.submissionCard}>
                  <View style={styles.submissionHeader}>
                    <Text style={styles.submissionUrl} numberOfLines={1}>
                      {sub.videoUrl}
                    </Text>
                    <StatusBadge status={sub.status} />
                  </View>
                  {sub.feedback && (
                    <Text style={styles.feedbackText}>{sub.feedback}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Submit Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Submit Your Video</Text>

            {submitted ? (
              <View style={styles.successCard}>
                <Ionicons
                  name="checkmark-circle"
                  size={48}
                  color={Colors.success}
                />
                <Text style={styles.successTitle}>Submitted!</Text>
                <Text style={styles.successText}>
                  Your video is now under review. You'll see the status update in
                  My Submissions.
                </Text>
                <Pressable
                  style={styles.submitAnotherBtn}
                  onPress={() => setSubmitted(false)}
                >
                  <Text style={styles.submitAnotherText}>Submit Another</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.submitCard}>
                <Text style={styles.inputLabel}>Video URL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="https://www.tiktok.com/@you/video/..."
                  placeholderTextColor={Colors.textLight}
                  value={videoUrl}
                  onChangeText={setVideoUrl}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="url"
                />
                <Text style={styles.inputHint}>
                  Paste your TikTok or Instagram Reel URL
                </Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.submitBtn,
                    pressed && styles.submitBtnPressed,
                    !videoUrl.trim() && styles.submitBtnDisabled,
                  ]}
                  onPress={handleSubmit}
                >
                  <Ionicons name="paper-plane" size={18} color={Colors.white} />
                  <Text style={styles.submitBtnText}>Submit Video</Text>
                </Pressable>
              </View>
            )}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.sm,
    borderRadius: 999,
    backgroundColor: Colors.background,
  },
  backButtonPressed: {
    opacity: 0.8,
  },
  backButtonText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  logo: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },
  brand: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    backgroundColor: Colors.background,
    borderRadius: 16,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.sm,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  briefCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  briefText: {
    fontSize: FontSize.sm,
    color: Colors.text,
    lineHeight: 22,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.sm + 4,
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  thumbnail: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.border,
  },
  videoInfo: {
    flex: 1,
    marginLeft: Spacing.sm + 4,
  },
  videoTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  videoUrl: {
    fontSize: FontSize.xs,
    color: Colors.primaryLight,
    marginTop: 2,
  },
  submissionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  submissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submissionUrl: {
    fontSize: FontSize.sm,
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  feedbackText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    fontStyle: 'italic',
  },
  submitCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
  },
  inputLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    fontSize: FontSize.sm,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputHint: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: Spacing.sm + 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  submitBtnPressed: {
    opacity: 0.9,
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  successCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.xl,
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  successText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
    lineHeight: 20,
  },
  submitAnotherBtn: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  submitAnotherText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: FontSize.sm,
  },
});
