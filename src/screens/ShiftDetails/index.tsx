import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { shiftsStore } from '../../store/ShiftsStore.ts';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App.tsx';
import { styles } from './styles.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftDetails'>;

const ShiftDetails = observer(({ route }: Props) => {
  const { id } = route.params;
  const shift = shiftsStore.getById(id);

  if (!shift) {
    return (
      <View style={styles.infoContainer}>
        <Text>Смена не найдена</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: shift.logo }}
        style={styles.logo}
        resizeMode="cover"
      />
      <Text style={styles.companyNameText}>{shift.companyName}</Text>
      <Text>
        Свободно мест: {shift.planWorkers - shift.currentWorkers}/
        {shift.planWorkers}
      </Text>
      <Text>{shift.address}</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.defaultText}>Дата: {shift.dateStartByCity}</Text>
        <Text style={styles.defaultText}>
          Время: {shift.timeStartByCity} - {shift.timeEndByCity}
        </Text>
        <Text style={styles.defaultText}>Оплата: {shift.priceWorker} ₽</Text>
        <Text style={styles.defaultText}>Рейтинг: {shift.customerRating}</Text>
      </View>
      <View style={styles.infoBlock}>
        <Text style={styles.defaultText}>{shift.customerFeedbacksCount}</Text>
        {
          // TODO: Можно в дальнейшем добавить список отзывов
        }
      </View>
    </ScrollView>
  );
});

export default ShiftDetails;
