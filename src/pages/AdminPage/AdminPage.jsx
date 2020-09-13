import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import LecturerList from './lecturers';
import { PostList, PostEdit, PostCreate } from './posts';
import authProvider from './authProvider';
import Dashboard from './Dashboard';

export default function AdminPage() {
  return (
    <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}>
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
      <Resource name="users" list={LecturerList} />
    </Admin>
  );
}
