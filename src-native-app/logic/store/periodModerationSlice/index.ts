// store/periodModerationSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';
import { PeriodGetSerializers, PeriodInput, PeriodUpdateInput } from '../../api/Api.ts';

// Типы для параметров запросов
export interface PeriodListQuery {
  search?: string;
}

export interface PeriodCreateData {
  name: string;
  start: string;
  end: string;
  image?: File;
}

// Асинхронный thunk для получения списка периодов
export const periodList = createAsyncThunk<
  {
    periods: PeriodGetSerializers[];
    bid_info: {
      bid_id?: number;
      count_of_periods?: number;
      detail?: string;
    };
  },
  PeriodListQuery
>('periods/periodList', async (query, { rejectWithValue }) => {
  try {
    const response = await api.periods.periodList(query);
    if ('data' in response) {
      return response.data;
    }
    throw new Error('Failed to fetch periods');
  } catch (error) {
    console.error('Fetch periods failed:', error);
    return rejectWithValue(error.message || 'Failed to fetch periods');
  }
});

// Асинхронный thunk для создания периода
export const periodCreate = createAsyncThunk<
  PeriodGetSerializers,
  PeriodCreateData
>('periods/periodCreate', async (data, { rejectWithValue }) => {
  try {
    const response = await api.periods.periodCreate(data);
    if ('data' in response) {
      return response.data;
    }
    throw new Error('Failed to create period');
  } catch (error) {
    console.error('Create period failed:', error);
    return rejectWithValue(error.message || 'Failed to create period');
  }
});

// Асинхронный thunk для обновления периода
export const periodUpdate = createAsyncThunk<
  PeriodGetSerializers,
  { periodId: string; data: PeriodUpdateInput }
>('periods/periodUpdate', async ({ periodId, data }, { rejectWithValue }) => {
  try {
    const response = await api.periods.periodUpdate(periodId, data);
    if ('data' in response) {
      return response.data;
    }
    throw new Error('Failed to update period');
  } catch (error) {
    console.error('Update period failed:', error);
    return rejectWithValue(error.message || 'Failed to update period');
  }
});

// Асинхронный thunk для удаления периода
export const periodDelete = createAsyncThunk<
  string,
  string
>('periods/periodDelete', async (periodId, { rejectWithValue }) => {
  try {
    await api.periods.periodDelete(periodId);
    return periodId
  } catch (error) {
    console.error('Delete period failed:', error);
    return rejectWithValue(error.message || 'Failed to delete period');
  }
});

// Асинхронный thunk для получения детальной информации о периоде
export const periodGet = createAsyncThunk<
  PeriodGetSerializers,
  string
>('periods/periodGet', async (periodId, { rejectWithValue }) => {
  try {
    const response = await api.periods.periodGet(periodId);
    if ('data' in response) {
      return response.data;
    }
    throw new Error('Failed to get period details');
  } catch (error) {
    console.error('Get period details failed:', error);
    return rejectWithValue(error.message || 'Failed to get period details');
  }
});


export const periodImageUpdate = createAsyncThunk<
  void,
  { periodId: string; data: { image: File } }
>('periods/periodImageUpdate', async ({ periodId, data }, { rejectWithValue }) => {
  try {
    const formData = new FormData()
    formData.append('image', data.image)
    await api.periods.periodImageCreate(periodId, formData);
  } catch (error) {
    console.error('Update period image failed:', error);
    return rejectWithValue(error.message || 'Failed to update period image');
  }
});


// Интерфейс для состояния периодов
interface PeriodState {
  periods: PeriodGetSerializers[];
  period: PeriodGetSerializers | null;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: PeriodState = {
  periods: [],
  period: null,
  loading: false,
  error: null,
};

// Создание слайса
const periodModerationSlice = createSlice({
  name: 'periods',
  initialState,
  reducers: {
    clearPeriod(state) {
        state.period = null
    }
  },
  extraReducers: (builder) => {
    builder
      // PeriodList
      .addCase(periodList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(periodList.fulfilled, (state, action: PayloadAction<{ periods: PeriodGetSerializers[]; bid_info: any }>) => {
        state.periods = action.payload.periods;
        state.loading = false;
        state.error = null;
      })
      .addCase(periodList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // PeriodCreate
      .addCase(periodCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(periodCreate.fulfilled, (state, action: PayloadAction<PeriodGetSerializers>) => {
        state.periods.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(periodCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // PeriodUpdate
      .addCase(periodUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(periodUpdate.fulfilled, (state, action: PayloadAction<PeriodGetSerializers>) => {
        const updatedPeriodIndex = state.periods.findIndex(period => period.id === action.payload.id);
        if (updatedPeriodIndex !== -1) {
          state.periods[updatedPeriodIndex] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(periodUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // PeriodDelete
      .addCase(periodDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(periodDelete.fulfilled, (state, action: PayloadAction<string>) => {
        state.periods = state.periods.filter(period => period!.id!.toString() !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(periodDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // PeriodGet
      .addCase(periodGet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(periodGet.fulfilled, (state, action: PayloadAction<PeriodGetSerializers>) => {
        state.period = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(periodGet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // PeriodImageUpdate
      .addCase(periodImageUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(periodImageUpdate.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(periodImageUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const { clearPeriod } = periodModerationSlice.actions;
export default periodModerationSlice.reducer;