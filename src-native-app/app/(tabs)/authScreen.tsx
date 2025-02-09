import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { userAuth } from '@/logic/store/userSlice';

export const AuthorizationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  // Получаем данные из redux-хранилища
  const { isAuthenticated, loading, error } = useAppSelector(state => state.user);

  const onSubmit = async () => {
    // Проверяем, что заполнено хотя бы одно поле
    if (username || password) {
      const response = await dispatch(userAuth({ username, password }));
      // Если в ответе есть data и пользователь аутентифицирован – переходим на страницу каталога
      if ('data' in response && isAuthenticated) {
        navigation.navigate('Каталог');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Каталог');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Авторизация</Text>

        {/* Поле ввода email */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Введите email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Поле ввода пароля */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Введите пароль"
            secureTextEntry={true}
          />
        </View>

        {/* Вывод ошибки, если есть */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Кнопка отправки */}
        <Button
          title={loading ? '...' : 'Войти'}
          onPress={onSubmit}
          disabled={loading}
        />

        {/* Ссылка на регистрацию */}
        <View style={styles.registration}>
          <Text style={styles.registrationText}>Еще нет аккаунта? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Регистрация')}>
            <Text style={styles.linkText}>Зарегистрируйтесь</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AuthorizationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1efda',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 3, // для Android
    shadowColor: '#000', // для iOS
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
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
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  registration: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registrationText: {
    fontSize: 16,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
