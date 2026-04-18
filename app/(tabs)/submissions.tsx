import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { store } from '../../src/data/store';
import { Submission } from '../../src/data/types';
import { StatusBadge } from '../../src/components/StatusBadge';
import { Colors, FontSize, Spacing } from '../../src/constants/theme';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function SubmissionCard({ submission }: { submission: Submission }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.brandInfo}>
          <Text style={styles.brand}>{submission.brand}</Text>
          <Text style={styles.campaignTitle}>{submission.campaignTitle}</Text>
        </View>
        <StatusBadge status={submission.status} />
      </View>

      <View style={styles.urlRow}>
        <Ionicons name="link-outline" size={16} color={Colors.textSecondary} />
        <Text style={styles.url} numberOfLines={1}>
          {submission.videoUrl}
        </Text>
      </View>

      <View style={styles.dateRow}>
        <Ionicons
          name="calendar-outline"
          size={14}
          color={Colors.textLight}
        />
        <Text style={styles.date}>{formatDate(submission.submittedAt)}</Text>
      </View>

      {submission.feedback && (
        <View style={styles.feedbackRow}>
          <Ionicons
            name="chatbubble-outline"
            size={14}
            color={Colors.textSecondary}
          />
          <Text style={styles.feedback}>{submission.feedback}</Text>
        </View>
      )}
    </View>
  );
}

export default function SubmissionsScreen() {
  const [submissions, setSubmissions] = useState<Submission[]>(
    store.getSubmissions()
  );

  useEffect(() => {
    return store.subscribe(() => {
      setSubmissions(store.getSubmissions());
    });
  }, []);

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;
  const approvedCount = submissions.filter(
    (s) => s.status === 'approved'
  ).length;
  const rejectedCount = submissions.filter(
    (s) => s.status === 'rejected'
  ).length;

  return (
    <View style={styles.container}>
      <FlatList
        data={submissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SubmissionCard submission={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.heading}>My Submissions</Text>
              <Text style={styles.subtitle}>
                Track all your campaign submissions
              </Text>
            </View>

            <View style={styles.statsRow}>
              <View style={[styles.statCard, { backgroundColor: '#EBF5FF' }]}>
                <Text style={[styles.statNum, { color: Colors.pending }]}>
                  {pendingCount}
                </Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#E6FFF5' }]}>
                <Text style={[styles.statNum, { color: Colors.success }]}>
                  {approvedCount}
                </Text>
                <Text style={styles.statLabel}>Approved</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#FFEDE9' }]}>
                <Text style={[styles.statNum, { color: Colors.danger }]}>
                  {rejectedCount}
                </Text>
                <Text style={styles.statLabel}>Rejected</Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="paper-plane-outline"
              size={48}
              color={Colors.textLight}
            />
            <Text style={styles.emptyTitle}>No submissions yet</Text>
            <Text style={styles.emptyText}>
              Browse campaigns and submit your first video!
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  header: {
    paddingTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  heading: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  statNum: {
    fontSize: FontSize.xl,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm + 4,
  },
  brandInfo: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  brand: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  campaignTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  urlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  url: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  date: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    marginTop: Spacing.sm + 4,
    paddingTop: Spacing.sm + 4,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  feedback: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
