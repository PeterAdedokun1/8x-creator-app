import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="campaign/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
