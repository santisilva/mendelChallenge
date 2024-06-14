import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {getBook} from '../../services/books';
import {useRoute, RouteProp} from '@react-navigation/native';
import {BookDetailsRequired} from '../../services/books/types';
import {getAuthor} from '../../services/authors';
import {AuthorBio, RootStackParamList} from './types';

type BookScreenRouteProp = RouteProp<RootStackParamList, 'Book'>;

const Book: React.FC = () => {
  const route = useRoute<BookScreenRouteProp>();
  const [bookInformation, setBookInformation] =
    useState<BookDetailsRequired | null>(null);
  const [authorBios, setAuthorBios] = useState<AuthorBio[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {key, title, author_name, cover_i, first_publish_year} = route.params;

  useEffect(() => {
    getBook(key).then(res => {
      setBookInformation(res as BookDetailsRequired);
    });
  }, [key]);

  const loadAuthorBio = async (authorKey: string) => {
    try {
      const res = await getAuthor(authorKey);
      return {
        key: authorKey,
        name: res.name,
        bio: res.bio || 'No biography available',
      };
    } catch (error) {
      return {key: authorKey, name: '', bio: 'No biography available'};
    }
  };

  const loadBiographies = useCallback(async () => {
    if (!bookInformation) return;

    setIsLoading(true);
    const bios = await Promise.all(
      bookInformation.authors.map(authorInfo =>
        loadAuthorBio(authorInfo.author.key),
      ),
    );
    setAuthorBios(bios);
    setIsLoading(false);
  }, [bookInformation]);

  useEffect(() => {
    loadBiographies();
  }, [bookInformation, loadBiographies]);

  const renderItem = ({item}: {item: AuthorBio}) => (
    <View style={styles.bioContainer}>
      <Text style={styles.authors}>{item.name}</Text>
      <Text style={styles.bio}>{item.bio}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.cover}
        source={{uri: `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`}}
      />
      <Text style={styles.title}>
        {title} ({first_publish_year})
      </Text>
      <Text style={styles.description}>{bookInformation?.description}</Text>
      <Text style={styles.authors}>Autores:</Text>
      {author_name.map((author, index) => (
        <Text key={index} style={styles.authors}>
          {author}
        </Text>
      ))}
      <Text style={styles.biographies}>Biografía:</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={authorBios}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          ListEmptyComponent={<Text>No biographies available.</Text>}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 40,
    alignItems: 'center',
  },
  cover: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  description: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  authors: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  biographies: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  bio: {
    marginLeft: 10,
  },
});
