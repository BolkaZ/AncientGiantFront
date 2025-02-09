import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {logout} from '@/logic/store/userSlice';

export const HeaderUserInfo = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { isAuthenticated, user } = useAppSelector(state => state.user);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      {!isAuthenticated ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Заявка')}
            style={[styles.button, styles.infoButton]}
          >
            <Text style={styles.infoButtonText}>Войти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Регистрация')}
            style={[styles.button, styles.linkButton]}
          >
            <Text style={styles.linkButtonText}>Регистрация</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userContainer}>
          <Text style={styles.userText}>
            {user?.first_name} / {user?.username}
          </Text>
          <TouchableOpacity
            onPress={onLogout}
            style={[styles.button, styles.outlineDangerButton]}
          >
            <Text style={styles.dangerButtonText}>Выйти</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HeaderUserInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  infoButton: {
    backgroundColor: '#17a2b8', // Цвет кнопки "Войти"
  },
  linkButton: {
    backgroundColor: 'transparent',
  },
  outlineDangerButton: {
    borderWidth: 1,
    borderColor: '#dc3545',
    backgroundColor: 'transparent',
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  linkButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  dangerButtonText: {
    color: '#dc3545',
    fontSize: 14,
  },
});
