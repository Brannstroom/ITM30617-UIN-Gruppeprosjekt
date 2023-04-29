import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'myGame',
    title: 'My game',
    type: 'document',
    fields: [
        defineField({
            name: 'game',
            title: 'Game',
            type: 'reference',
            to: [{type: 'game'}],
        }),
        defineField({
            name: 'isFavorite',
            title: 'Is favorite?',
            type: 'boolean',
        }),
        defineField({
            name: 'hoursPlayed',
            title: 'Hours played',
            type: 'number',
        }),
        defineField({
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{type: 'user'}],
        }),
    ],
})