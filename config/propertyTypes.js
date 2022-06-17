export const propertyTypes = {
    PET: {
        id: 1,
        name: 'Pet',
        properties: [
            {
                name: 'name',
                type: 'string',
                description: 'The name of the pet.',
                required: true,
                default: '',
                example: '',
                options: []
            },
            {
                name: 'breed',
                type: 'string',
                description: 'The breed of the pet.',
                required: true,
                default: '',
                example: '',
                options: []
            },
            {
                name: 'age',
                type: 'number',
                description: 'The age of the pet.',
                required: true,
                default: 0,
                example: 0,
                options: []
            },
            {
                name: 'color',
                type: 'string',
                description: 'The color of the pet.',
                required: true,
                default: '',
                example: '',
                options: []
            },
            {
                name: 'birthday',
                type: 'date',
                description: 'The birthday of the pet.',
                required: true,
                default: '',
                example: '',
                options: []
            }
        ]
    },

}