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
            name: 'releaseDate',
            title: 'Release Date',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
                calendarTodayLabel: 'Today',
            },
        }),
        // Rating with 1-10 stars
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            options: {
                list: [
                    {title: '1', value: 1},
                    {title: '2', value: 2},
                    {title: '3', value: 3},
                    {title: '4', value: 4},
                    {title: '5', value: 5},
                ],
            },
        }),
        defineField({
            name: 'summary',
            title: 'Short Summary',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
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
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
    ],
})