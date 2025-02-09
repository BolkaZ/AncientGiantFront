import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getMockPeriod } from '@/logic/store/periodSlice';
// Импортируем placeholder (пустое изображение)
import Plug from '@/assets/images/img_empty-photo.png';

interface RouteParams {
  id: string | number;
}

export const DetailPage = () => {
  // Получаем параметры маршрута через useRoute
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const dispatch = useAppDispatch();
  const period = useAppSelector((state) => state.period.period);

  useEffect(() => {
    if (id) {
      dispatch(getMockPeriod(Number(id)));
    }
  }, [id]);

  if (!period) {
    // Можно вместо null показать индикатор загрузки
    return null;
  }

  // Если period.image отсутствует или пустой, используем локальный Plug,
  // иначе предполагается, что period.image – это URL
  const imageSource =
    !period.image || period.image.length === 0 ? Plug : { uri: period.image };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={imageSource} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{period.name}</Text>
          <Text style={styles.cardText}>{period.detail_text}</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>
                <Text style={styles.bold}>Начало: </Text>
                {period.start}
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>
                <Text style={styles.bold}>Конец: </Text>
                {period.end}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#753526',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4, // тень для Android
    shadowColor: '#000', // тень для iOS
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 10,
  },
  cardImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});
