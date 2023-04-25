import {defineField, defineType} from 'sanity'

export default defineType({
//create schema for user
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        defineField({
            name: 'id',
            title: 'ID',
            type: 'number',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'username',
            title: 'Username',
            type: 'string',
        }),
        defineField({
            name: 'password',
            title: 'Password',
            type: 'string',
        }),
    ],
})