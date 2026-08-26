import { Button, Text, View } from "react-native";
import { useClerk } from "@clerk/expo";
import { useRouter } from "expo-router";

export default function Index() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home — signed in</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
}
