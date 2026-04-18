import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import { campaigns } from '../../src/data/campaigns';
import { CampaignCard } from '../../src/components/CampaignCard';
import { Colors, FontSize, Spacing } from '../../src/constants/theme';

export default function CampaignsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: '/campaign/[id]', params: { id: item.id } }}
            asChild
          >
            <CampaignCard campaign={item} onPress={() => {}} />
          </Link>
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.greeting}>Hey, Creator </Text>
            <Text style={styles.subtitle}>
              {campaigns.length} active campaigns available
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
    marginBottom: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
