import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, FontSize, Spacing } from '../constants/theme';
import { Campaign } from '../data/types';

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function CampaignCard({ campaign, onPress }: { campaign: Campaign; onPress: () => void }) {
  const daysLeft = daysUntil(campaign.deadline);
  const isUrgent = daysLeft <= 7;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Text style={styles.logo}>{campaign.brandLogo}</Text>
          <View style={styles.brandInfo}>
            <Text style={styles.brandName}>{campaign.brand}</Text>
            <Text style={styles.title}>{campaign.title}</Text>
          </View>
        </View>
        <View style={styles.payoutBadge}>
          <Text style={styles.payoutAmount}>${campaign.payoutPerVideo}</Text>
          <Text style={styles.payoutLabel}>per video</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {campaign.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.tags}>
          {campaign.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.deadline, isUrgent && styles.deadlineUrgent]}>
          {daysLeft > 0 ? `${daysLeft}d left` : 'Expired'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    fontSize: 32,
    marginRight: Spacing.sm + 4,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  payoutBadge: {
    backgroundColor: '#F0EDFF',
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs + 2,
    borderRadius: 12,
    alignItems: 'center',
  },
  payoutAmount: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  payoutLabel: {
    fontSize: 10,
    color: Colors.primaryLight,
    fontWeight: '500',
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm + 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  tag: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 8,
  },
  tagText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  deadline: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  deadlineUrgent: {
    color: Colors.danger,
  },
});
