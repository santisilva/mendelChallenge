import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Paginator = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) => {
  return (
    <View style={styles.paginator}>
      <TouchableOpacity onPress={() => setPage(page - 1)} disabled={page === 1}>
        <Text style={styles.butonPage}> Anterior</Text>
      </TouchableOpacity>
      <Text>
        {' '}
        Pagina {page}/{totalPages}{' '}
      </Text>

      <TouchableOpacity
        onPress={() => setPage(page + 1)}
        disabled={page === totalPages}>
        <Text style={styles.butonPage}> Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  paginator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  butonPage: {
    fontSize: 14,
    color: 'blue',
  },
});
