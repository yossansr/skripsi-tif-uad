import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { LecturerList } from './Lecturer';
import authProvider from './authProvider';
import Dashboard from './Dashboard';

export default function AdminPage() {
  return (
    <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}>
      <Resource name="users" list={LecturerList} />
    </Admin>
  );
}
