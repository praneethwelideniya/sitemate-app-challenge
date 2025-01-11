import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { NewsArticle } from "../types/news";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export const NewsCard = ({ article, index }: NewsCardProps) => {
  return (
    <Link
      href={{
        pathname: "/article",
        params: { article: JSON.stringify(article) },
      }}
      asChild
      key={`${article.url}-${index}`}
    >
      <TouchableOpacity style={styles.newsCard}>
        <Image
          source={{
            uri: article.urlToImage || "https://via.placeholder.com/150",
          }}
          style={styles.newsImage}
        />
        <View style={styles.newsContent}>
          <Text style={styles.newsTitle} numberOfLines={2}>
            {article.title}
          </Text>
          <Text style={styles.newsDescription} numberOfLines={2}>
            {article.description}
          </Text>
          <Text style={styles.newsSource}>
            {article.source.name} •{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  newsCard: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  newsImage: {
    width: "100%",
    height: 200,
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  newsDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  newsSource: {
    fontSize: 12,
    color: "#999",
  },
});
