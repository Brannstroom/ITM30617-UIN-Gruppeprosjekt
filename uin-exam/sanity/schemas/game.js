import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'game',
    title: 'Game',
    type: 'document',
    fields: [
        defineField({
            name: 'id',
            title: 'ID',
            type: 'string',
        }),
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
            name: 'image',
            title: 'Image',
            type: 'string',
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'text',
        }),
        defineField({
            name: 'developers',
            title: 'Developers',
            type: 'string',
        }),
        defineField({
            name: 'publisher',
            title: 'Publisher',
            type: 'string',
        }),
        defineField({
            name: 'platforms',
            title: 'Platforms',
            type: 'string',
        }),
        defineField({
            name: 'stores',
            title: 'Stores',
            type: 'string',
        }),
    ],
})