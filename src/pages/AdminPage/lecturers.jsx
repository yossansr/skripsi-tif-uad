/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  List, Datagrid, TextField, EmailField,
} from 'react-admin';

const LecturerList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="website" />
      <TextField source="company.name" />
    </Datagrid>
  </List>

);

export default LecturerList;
