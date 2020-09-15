/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Edit, Create, SimpleForm, TextInput, List, Datagrid, TextField, EditButton,
} from 'react-admin';

const LecturerTitle = ({ record }) => (
  <span>
    Post
    {record ? `"${record.title}"` : ''}
  </span>
);

export const LecturerList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="nip" />
      <EditButton />
    </Datagrid>
  </List>
);

export const LecturerEdit = (props) => (
  <Edit title={<LecturerTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="nip" />
    </SimpleForm>
  </Edit>
);

export const LecturerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="nip" />
    </SimpleForm>
  </Create>
);
