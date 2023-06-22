import { createSlice } from '@reduxjs/toolkit'
import { getProduct } from './product.thunk'

const initialState = {
    isLoading: false,
    productData: [],
    isError: '',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.productData.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        orderQuantity: (item.orderQuantity =
                            item.orderQuantity + 1),
                        total: (item.total = item.total + item.price),
                    }
                }
                return item
            })
        },
        decrement: (state, action) => {
            state.productData.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        orderQuantity: (item.orderQuantity =
                            item.orderQuantity - 1),
                        total: (item.total = item.total - item.price),
                    }
                }
                return item
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled, (state, action) => {
            action.payload.map((elem) => {
                elem.orderQuantity = 0
                elem.total = 0
                return elem
            })

            state.productData = action.payload
            state.isLoading = false
        })

        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getProduct.rejected, (state) => {
            state.isLoading = false
            state.isError = 'Some thing went wrong'
        })
    },
})

export const ActionsType = productSlice.actions
