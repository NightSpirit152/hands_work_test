import { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { shiftsStore } from '../../store/ShiftsStore.ts';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftsList'>;

const ShiftsList = observer(({ navigation }: Props) => {
  const { shifts, loading, error } = shiftsStore;

  useEffect(() => {
    shiftsStore.fetchShifts();
  }, []);

  // @ts-ignore
  const openDetails = (id: string) => navigation.navigate('ShiftDetails', { id });

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 12 }}>Загружаем смены…</Text>
      </View>
    );

  if (error && shifts.length === 0)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text style={{ color: 'tomato', textAlign: 'center' }}>Ошибка: {error}</Text>
        <TouchableOpacity onPress={() => shiftsStore.fetchShifts()} style={{ marginTop: 16 }}>
          <Text style={{ color: '#3b82f6' }}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <FlatList
      data={shifts}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => shiftsStore.fetchShifts()} />
      }
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => openDetails(item.id)}
          style={{
            padding: 14,
            borderRadius: 12,
            backgroundColor: '#0e1015',
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#1f2430'
          }}
        >
          {!!item.companyName && <Text style={{ marginTop: 4, color: '#9aa4b2' }}>{item.companyName}</Text>}
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            {!!item.priceWorker && (
              <Text style={{ marginLeft: 12, color: '#9aa4b2' }}>{item.priceWorker} ₽/час</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        !loading ? <Text style={{ textAlign: 'center', marginTop: 40 }}>Смен рядом не найдено</Text> : null
      }
    />
  );
});

export default ShiftsList;
