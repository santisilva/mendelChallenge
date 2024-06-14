import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {searchBooks} from '../../services/books';
import {PartialBook} from '../../services/books/types';
import {Paginator, Skeleton} from '../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';

/*
  no uso AbortController porque a partir de react-query 3 viene integrado
 */

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [searchedBook, setSearchedBook] = useState<string>('');
  const [limit] = useState<number>(10);

  const navigation = useNavigation();

  const fetchBooks = async ({
    queryKey,
  }: {
    queryKey: [string, number, number];
  }) => {
    const [searchQuery, limit, page] = queryKey;
    const response = await searchBooks(searchQuery, limit, page);
    return response;
  };

  const {data, isLoading, isError} = useQuery({
    queryKey: [searchedBook, limit, page],
    queryFn: fetchBooks,
    enabled: searchedBook.length >= 3,
  });

  const handleSeeBook = (
    key: string,
    title: string,
    author_name: string[],
    cover_i: number,
    first_publish_year: number,
  ) => {
    navigation.navigate('Book', {
      key: key,
      title: title,
      author_name: author_name,
      cover_i: cover_i,
      first_publish_year: first_publish_year,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Bienvenido a la biblioteca abierta</Text>
        <Text>Buscar libros</Text>
        <TextInput
          value={searchedBook}
          onChangeText={text => setSearchedBook(text)}
          style={styles.input}
        />
        <Text style={styles.textRequest}>
          *Escribe al menos 3 letras para obtener resultados.
        </Text>
        <Paginator
          page={page}
          setPage={setPage}
          totalPages={data ? Math.ceil(data.numFound / limit) : 1}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading
            ? Array.from({length: limit}).map((_, index) => (
                <Skeleton height={60} key={index} />
              ))
            : data?.docs.map((book: PartialBook) => (
                <TouchableOpacity
                  key={book.key}
                  style={[styles.card, styles.row]}
                  onPress={() =>
                    handleSeeBook(
                      book.key,
                      book.title,
                      book.author_name,
                      book.cover_i,
                      book.first_publish_year,
                    )
                  }>
                  <View style={styles.containerInfo}>
                    <Text> Title: {book.title}</Text>
                    <Text> Author: {book.author_name}</Text>
                    <Text> First Publish Year: {book.first_publish_year}</Text>
                  </View>
                  <Text style={styles.textDetails}> Ver detalles</Text>
                </TouchableOpacity>
              ))}
          {isError && (
            <Text style={styles.errorText}>
              Hubo un error al cargar los datos.
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2B2B2B',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  textRequest: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  card: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerInfo: {
    flex: 1,
    paddingRight: 10,
  },
  textDetails: {
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
