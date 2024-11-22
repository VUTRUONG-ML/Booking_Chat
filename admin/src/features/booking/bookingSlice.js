import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    bookings: [],
    booking: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const createBooking = createAsyncThunk("booking/create", async (bookingData, thunkApi) => {
    try {

        const res = await fetch(`/api/bookings/`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(bookingData),
        })
        const data = await res.json()
        if (!res.ok) {
            return thunkApi.rejectWithValue(data);
        }

        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

export const getBookings = createAsyncThunk(
    "booking/getbookings",
    async (_, thunkApi) => {
        try {
            const res = await fetch("/api/bookings");
            const data = await res.json();
            if (!res.ok) {
                return thunkApi.rejectWithValue(data);
            }
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const deleteBooking = createAsyncThunk(
    'booking/deleteBooking',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Kiểm tra phản hồi từ server
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }

            const data = await response.json();
            return data; // Trả về dữ liệu phản hồi
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const confirmBooking = createAsyncThunk(
    'booking/confirmBooking',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/bookings/confirm/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Kiểm tra phản hồi từ server
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }

            const data = await response.json();
            return data; // Trả về dữ liệu phản hồi
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBooking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.booking = action.payload;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBookings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookings = action.payload;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteBooking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookings = state.bookings.filter(
                    (booking) => booking._id.toString() !== action.payload.id
                );
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(confirmBooking.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(confirmBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookings = action.payload;
            })
            .addCase(confirmBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = bookingSlice.actions;

export default bookingSlice.reducer;