import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'game',
    title: 'Game',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'apiId',
            title: 'API ID',
            type: 'number',
        }),
    ],
})