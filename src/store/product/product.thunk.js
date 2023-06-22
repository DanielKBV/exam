import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from '../../JS/dataService'

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProducts()

            return response.products
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
