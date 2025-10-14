import { makeAutoObservable, runInAction } from "mobx";
import Geolocation from "react-native-geolocation-service";
import type { Shift } from "../types";

class ShiftsStore {
  shifts: Shift[] = [];
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
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  }

  async fetchShiftsNearMe() {
    this.loading = true; this.error = null;
    try {
      const { lat, lon } = await this.requestLocation();

      const res = await fetch(`https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${lat}&longitude=${lon}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const items = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);

      runInAction(() => {
        this.shifts = items;
        this.loading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e?.message ?? "Ошибка";
        this.loading = false;
      });
    }
  }
}

export const shiftsStore = new ShiftsStore();
