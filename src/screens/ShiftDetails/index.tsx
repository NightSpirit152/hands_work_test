import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { shiftsStore } from '../../store/ShiftsStore.ts';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftDetails'>;

const ShiftDetails = observer(({ route }: Props) => {
  const { id } = route.params;
  const shift = shiftsStore.getById(id);

  if (!shift) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text>Смена не найдена</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {!!shift.logo && (
        <Image
          source={{ uri: shift.logo }}
          style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 16 }}
          resizeMode="cover"
        />
      )}
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{shift.companyName}</Text>
      {!!shift.companyName && <Text style={{ marginTop: 6, color: '#9aa4b2' }}>{shift.companyName}</Text>}
      {!!shift.address && <Text style={{ marginTop: 6 }}>{shift.address}</Text>}

      <View style={{ marginTop: 12 }}>
        {!!shift.dateStartByCity && <Text>Начало: {new Date(shift.dateStartByCity).toLocaleString()}</Text>}
        {!!shift.timeEndByCity && <Text>Окончание: {new Date(shift.timeEndByCity).toLocaleString()}</Text>}
        {!!shift.priceWorker && <Text>Оплата: {shift.priceWorker} ₽/час</Text>}
        {!!shift.customerRating && <Text>Рейтинг: {shift.customerRating} км</Text>}
      </View>
    </ScrollView>
  );
});

export default ShiftDetails;
