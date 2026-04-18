import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing } from '../constants/theme';
import { SubmissionStatus } from '../data/types';

const statusConfig: Record<SubmissionStatus, { color: string; bg: string; label: string }> = {
  pending: { color: Colors.pending, bg: '#EBF5FF', label: 'Pending' },
  approved: { color: Colors.success, bg: '#E6FFF5', label: 'Approved' },
  rejected: { color: Colors.danger, bg: '#FFEDE9', label: 'Rejected' },
};

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  const config = statusConfig[status];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs + 2,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs + 2,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
});
