import { configureStore } from '@reduxjs/toolkit';
import TaskSlice from '../features/taskSlice/TaskSlice';
import EntriesSlice from '../features/EntriesSlice/EntriesSlice';

export const store = configureStore({
    reducer:{
        tasks:TaskSlice,
        entries:EntriesSlice
    }
});
