import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeEndDate, changeName, changeStartDate } from '@/logic/store/filterSlice';
import { fetchPeriodCollection } from '@/logic/store/periodCollectionSlice';
import PeriodCard from '@/components/PeriodCard';
import Icon from '@/assets/images/icon.png';

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const filter = useAppSelector(state => state.filter);

  const { periods, loading, error, bidInfo } = useAppSelector(state => state.periodCollection);
  const { bid } = useAppSelector(state => state.bid);

  useEffect(() => {
    getData();
  }, [filter]);

  useEffect(()=>{
    console.log(bid?.id);
    
  },[bid])

  const getData = useDebouncedCallback(async () => {
    dispatch(fetchPeriodCollection({ search: filter.name }));
  }, 300);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Каталог</Text>

      {/* Форма фильтрации */}
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Период времени до Н.Э.</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              onChangeText={(value) => dispatch(changeStartDate(value))}
              placeholder="Начало"
              keyboardType="numeric"
              value={filter.startDate ? String(filter.startDate) : ''}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              onChangeText={(value) => dispatch(changeEndDate(value))}
              placeholder="Конец"
              keyboardType="numeric"
              value={filter.endDate ? String(filter.endDate) : ''}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Поиск</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => dispatch(changeName(value))}
              placeholder="Введите название"
              value={filter.name || ''}
            />
          </View>
        </View>
        {bid?.id && (
         <TouchableOpacity
           style={styles.bidLink}
         onPress={() => navigation.navigate(`Заявка`,{bidId: bid.id})}>
            <Image style={styles.bidImage} source={Icon} />
            <Text>Заявка</Text>
            
          </TouchableOpacity>
        )}
      </View>

      {/* Секция каталога */}
      <View style={styles.catalogContainer}>
        {loading && (
          <View style={styles.loadingBg}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {!loading && periods.length === 0 && error ? (
          <Text style={styles.errorText}>Ничего не найдено!</Text>
        ) : null}
        <View style={styles.cardsRow}>
          {periods.map((item, index) => (
            <PeriodCard key={index} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CatalogPage;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  form: {
    marginBottom: 15,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  inputHalf: {
    marginRight: 10,
  },
  bidLink: {
    alignSelf: 'center',
    marginTop: 10,
  },
  bidImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  catalogContainer: {
    marginTop: 15,
    position: 'relative',
  },
  loadingBg: {
    zIndex: 999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  cardsRow: {
    marginLeft: 85,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // Для отступов между карточками можно использовать margin внутри PeriodCard или здесь добавить отступы
  },
});
