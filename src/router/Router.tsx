import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from '../components/ListPage';
import DetailsPage from '../components/DetailsPage';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route index element={<ListPage />} />
                <Route path='/details' element={<DetailsPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Router;