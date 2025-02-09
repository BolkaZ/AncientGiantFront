import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GuestScreen = () => {
  const navigation = useNavigation();

  // @ts-ignore
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Верхняя секция с фоновым изображением */}
      <ImageBackground
        source={{
          uri: 'https://kudaufa.ru/uploads/169caf5d843288d53e486f7b36b231cc.jpg',
        }}
        style={styles.hero}
        resizeMode="cover"
      >
        {/* Наложение для затемнения фона и улучшения читаемости текста */}
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Путешествие в прошлое Земли</Text>
          <Text style={styles.heroSubtitle}>
            Узнайте больше о жизни динозавров и древних экосистемах.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Каталог')}
          >
            <Text style={styles.buttonText}>Узнать больше</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Основной контент */}
      <View style={styles.mainContent}>
        <Text style={styles.sectionTitle}>Что такое палеонтология?</Text>
        <Text style={styles.sectionSubtitle}>
          Палеонтология — это наука, изучающая историю жизни на Земле через
          ископаемые останки.
        </Text>

        <View style={styles.cardRow}>
          {/* Карточка "Древние существа" */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Древние существа</Text>
            <Text style={styles.cardText}>
              Изучение динозавров, морских существ и других древних форм жизни.
            </Text>
          </View>

          {/* Карточка "Ископаемые" */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ископаемые</Text>
            <Text style={styles.cardText}>
              Как окаменелости рассказывают нам о прошлом Земли.
            </Text>
          </View>

          {/* Карточка "Эволюция" */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Эволюция</Text>
            <Text style={styles.cardText}>
              Понимание эволюции и взаимосвязи видов на протяжении миллионов лет.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  hero: {
    minHeight: 600, // приблизительное значение; можно настроить под размеры экрана
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // затемнение для улучшения читаемости текста
    paddingVertical: 200,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff', // синий цвет, как у variant="primary" в Bootstrap
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  mainContent: {
    padding: 20,
    backgroundColor: '#f1efda',
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // чтобы карточки переходили на следующую строку при недостатке места
  },
  card: {
    backgroundColor: '#f8f9fa', // светлый фон, похожий на Bootstrap Card
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: '100%', // приблизительная ширина для трех колонок; можно настроить под нужный дизайн
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
});

export default GuestScreen;
