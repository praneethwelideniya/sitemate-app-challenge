import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { NewsArticle } from "../types/news";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function ArticleScreen() {
  const { article } = useLocalSearchParams();
  const router = useRouter();
  const newsArticle: NewsArticle = JSON.parse(article as string);

  const handleReadMore = async () => {
    await Linking.openURL(newsArticle.url);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: newsArticle.urlToImage || "https://via.placeholder.com/150",
            }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{newsArticle.title}</Text>

          <View style={styles.metadata}>
            <Text style={styles.source}>{newsArticle.source.name}</Text>
            <Text style={styles.date}>
              {new Date(newsArticle.publishedAt).toLocaleDateString()}
            </Text>
          </View>

          {newsArticle.author && (
            <Text style={styles.author}>By {newsArticle.author}</Text>
          )}

          <Text style={styles.description}>{newsArticle.description}</Text>
          <Text style={styles.articleContent}>{newsArticle.content}</Text>

          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={handleReadMore}
          >
            <Text style={styles.readMoreText}>Read Full Article</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  source: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    fontStyle: "italic",
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 15,
  },
  articleContent: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    marginBottom: 20,
  },
  readMoreButton: {
    backgroundColor: "#0066CC",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  readMoreText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
