import { makeAutoObservable, runInAction } from 'mobx';
import Geolocation from 'react-native-geolocation-service';
import type { Shift } from '../types';

class ShiftsStore {
  shifts: Shift[] = [];
  location: { latitude?: number; longitude?: number } | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getById(id: string) {
    return this.shifts.find(s => s.id === id);
  }

  requestLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        err => reject(err),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
      );
    });
  }

  async fetchShifts() {
    this.loading = true;
    this.error = null;
    try {
      let latitude = this.location?.latitude;
      let longitude = this.location?.longitude;
      if (!this.location) {
        // На эмуляторе геолокация работает странно и определяет где-то в США, для наглядности сделана захардкоженая ссылка
        // const { lat, lon } = await this.requestLocation();
        latitude = 45.039268;
        longitude = 38.987221;
      }

      const res = await fetch(
        `https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${latitude}&longitude=${longitude}`,
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const dataList = await res.json();

      const items = dataList?.data || [];
      console.log(items);
      runInAction(() => {
        this.shifts = items;
        this.loading = false;
        this.location = { latitude, longitude };
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e?.message ?? 'Ошибка';
        this.loading = false;
      });
    }
  }
}

export const shiftsStore = new ShiftsStore();
