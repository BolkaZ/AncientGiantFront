// BidDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  bidDelete,
  bidForm,
  bidGet,
  bidUpdate,
  periodInBidDelete,
} from '@/logic/store/bidSlice';
import { BidFormInput, BidUpdateInput } from '@/logic/api/Api';
import Plug from '@/assets/images/img_empty-photo.png'; // локальное изображение-плейсхолдер

export const BidDetailsPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  // Ожидаем, что bidId передаётся через параметры маршрута
  const { bidId } = route.params as { bidId: string };

  const { bid, loading, error } = useAppSelector((state) => state.bid);

  useEffect(() => {
    if (bidId) {
      dispatch(bidGet(bidId));
    }
  }, [bidId, dispatch]);

  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');

  useEffect(() => {
    if (bid) {
      setComment(bid.comment);
    }
  }, [bid]);

  const handleUpdateComment = async () => {
    if (bidId && bid) {
      const updatedBid: BidUpdateInput = {
        comment: comment,
      };

      const response = await dispatch(bidUpdate({ bidId, data: updatedBid }));

      if ('payload' in response && response.payload) {
        console.log('Bid updated successfully:', response.payload);
        Alert.alert('Успешно','Комментарий успешно обновлен!')
        navigation.navigate('Каталог');
      }
    }
  };

  const handleFormBid = async () => {
    if (bidId && bid) {
      const formData: BidFormInput = {
        comment: comment,
        name: name,
        group: group,
      };

      const response = await dispatch(bidForm({ bidId, data: formData }));

      if ('payload' in response && response.payload) {
        console.log('Bid formed successfully:', response.payload);
        Alert.alert('Успешно','Заявка успешно оформлена!')
        navigation.navigate('Каталог');
      }
    }
  };

  const handleDeleteBid = async () => {
    if (bidId) {
      const response = await dispatch(bidDelete(bidId));

      if ('payload' in response) {
        Alert.alert('Успешно','Заявка успешно удалена!')
        navigation.navigate('Каталог');
      }
    }
  };

  const handleDeletePeriod = async (periodId: string) => {
    if (bidId && bid && bid.id) {
      const periodData = { bid_id: bid.id };
      const response = await dispatch(
        periodInBidDelete({ periodId, data: periodData })
      );

      if ('payload' in response) {
        console.log('Period deleted successfully');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  if (!bid) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Заявка не найдена</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Карточка с деталями заявки */}
      <View style={styles.card}>
        <Text style={styles.header}>Детали заявки</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Поле для редактирования комментария */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Комментарий к модератору</Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Введите комментарий"
          />
        </View>

        {/* Поля для добавления животного */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Добавление животного</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Введите название"
          />
          <TextInput
            style={styles.input}
            value={group}
            onChangeText={setGroup}
            placeholder="Введите группу"
          />
        </View>

        {/* Кнопки действий */}
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleUpdateComment}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? '...' : 'Обновить комментарий'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.successButton]}
          onPress={handleFormBid}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? '...' : 'Формировать заявку'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.dangerButton]}
          onPress={handleDeleteBid}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? '...' : 'Удалить заявку'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Секция со списком периодов */}
      <Text style={styles.sectionHeader}>Список периодов</Text>
      {bid.periods.length === 0 ? (
        <Text style={styles.infoText}>Нет периодов</Text>
      ) : (
        <View style={styles.periodsContainer}>
          {bid.periods.map((period) => (
            <TouchableOpacity
              key={period.id?.toString() + period.name}
              style={styles.periodCard}
              onPress={() => handleDeletePeriod(period.id?.toString())}
            >
              <Image
                source={
                  !period.image || period.image.length === 0
                    ? Plug
                    : { uri: period.image }
                }
                style={styles.periodImage}
              />
              <View style={styles.periodCardBody}>
                <Text style={styles.periodTitle}>{period.name}</Text>
                <Text style={styles.periodSubtitle}>
                  Животные:
                  {'\n'}
                  {period.animals.map((animal, index) => (
                    <Text key={index} style={styles.animalText}>
                      {animal.name}, {animal.group}, {animal.quantity_found} найдено{'\n'}
                    </Text>
                  ))}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default BidDetailsPage;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
  },
  card: {
    borderWidth: 1,
    borderColor: '#753526',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#007bff',
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  periodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  periodCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#753526',
    borderRadius: 8,
    backgroundColor: '#efeeec',
    marginBottom: 15,
    overflow: 'hidden',
  },
  periodImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  periodCardBody: {
    padding: 10,
  },
  periodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  periodSubtitle: {
    fontSize: 14,
  },
  animalText: {
    fontSize: 14,
  },
});
