import { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { shiftsStore } from '../../store/ShiftsStore.ts';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App.tsx';
import { styles } from './styles.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftsList'>;

const ShiftsList = observer(({ navigation }: Props) => {
  const { shifts, loading, error } = shiftsStore;

  useEffect(() => {
    shiftsStore.fetchShifts();
  }, []);

  // @ts-ignore
  const openDetails = (id: string) =>
    navigation.navigate('ShiftDetails', { id });

  if (loading)
    return (
      <View style={styles.infoContainer}>
        <ActivityIndicator />
        <Text>Загружаем смены…</Text>
      </View>
    );

  if (error && shifts.length === 0)
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.errorText}>Ошибка: {error}</Text>
        <TouchableOpacity onPress={() => shiftsStore.fetchShifts()}>
          <Text style={styles.retryText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <FlatList
      data={shifts}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => shiftsStore.fetchShifts()}
        />
      }
      contentContainerStyle={styles.shiftsList}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => openDetails(item.id)}
          style={styles.shiftCard}
        >
          <View style={styles.workInfoContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.workType}
            >
              {
                // TODO: В случае если типов работ может быть несколько, сделать вывод через запятую
                item.workTypes[0]?.name
              }
            </Text>
            <Text numberOfLines={1} style={styles.defaultText}>
              Свободно мест: {item.planWorkers - item.currentWorkers}
            </Text>
          </View>
          <Text style={styles.defaultText}>{item.companyName}</Text>
          <Text style={styles.defaultText}>Адрес: {item.address}</Text>
          <View style={styles.payContainer}>
            <Text style={styles.payText}>Оплата: {item.priceWorker} ₽</Text>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        !loading ? (
          <Text style={{ textAlign: 'center', marginTop: 40 }}>
            Смен рядом не найдено
          </Text>
        ) : null
      }
    />
  );
});

export default ShiftsList;
