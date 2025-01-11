import { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import { useNews } from "../hooks/useNews";
import { StatusBar } from "expo-status-bar";
import { NewsArticle } from "../types/news";
import { SearchBar } from "../components/SearchBar";
import { NewsCard } from "../components/NewsCard";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { articles, isLoading, error, searchNews } = useNews();

  const handleSearch = () => {
    searchNews(searchQuery);
  };

  const renderNewsItem = ({
    item,
    index,
  }: {
    item: NewsArticle;
    index: number;
  }) => <NewsCard article={item} index={index} />;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {isLoading ? (
        <ActivityIndicator size="large" color="#0066CC" style={styles.loader} />
      ) : (
        <FlatList
          data={articles}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 60,
  },
  listContainer: {
    padding: 20,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
