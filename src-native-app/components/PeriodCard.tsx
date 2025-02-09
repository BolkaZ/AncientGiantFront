import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { periodInBidCreate } from '@/logic/store/bidSlice';
// Импортируем локальный плейсхолдер для изображения
// @ts-ignore
import Plug from '@/assets/images/img_empty-photo.png';
import {TPeriod} from '@/logic/api/types';

// Тип TPeriod импортируйте из вашего файла типов, если требуется
// import { TPeriod } from '../../api/types';

interface PeriodCardProps {
  item: TPeriod;
}

export const PeriodCard = ({ item }: PeriodCardProps) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { bid } = useAppSelector(state => state.bid);
  const { isAuthenticated } = useAppSelector(state => state.user);

  const [isDisabled, setIsDisabled] = useState(false);

  const handleAddPeriodToBid = async () => {
    try {
      const periodData: { bid_id?: number } = {
        bid_id: bid?.id ? bid.id : undefined,
      };

      const response = await dispatch(
        periodInBidCreate({ periodId: item.id.toString(), data: bid?.id ? periodData : {} })
      );

      if ('payload' in response && response.payload) {
        console.log('Period added to bid successfully:', response.payload);
        setIsDisabled(true);
        // Дополнительная логика (например, обновление состояния или навигация)
      }
    } catch (error) {
      console.error('Failed to add period to bid:', error);
    }
  };

  // Если изображения нет или строка пустая – используем Plug,
  // иначе предполагается, что item.image — URL, поэтому оборачиваем его в объект { uri }
  const imageSource =
    !item.image || item.image.length === 0 ? Plug : { uri: item.image };

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>Начало: {item.start}</Text>
        <Text style={styles.cardSubtitle}>Конец: {item.end}</Text>
        <View style={styles.buttonRow}>
          {isAuthenticated && (
            <TouchableOpacity
              onPress={handleAddPeriodToBid}
              style={[styles.button, isDisabled && styles.disabledButton]}
              disabled={isDisabled}
            >
              <Text style={styles.buttonText}>Добавить</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate(`Период`,{ id: item.id })}
            style={styles.outlinedButton}
          >
            <Text style={styles.outlinedButtonText}>Подробнее</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PeriodCard;

const styles = StyleSheet.create({
  card: {
    maxWidth: 250,
    borderColor: '#753526',
    backgroundColor: '#efeeec',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    margin: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  outlinedButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});
