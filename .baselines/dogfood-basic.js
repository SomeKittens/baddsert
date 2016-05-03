({
    'basic assert': ({
        '_meta': ({
            'type': 'object'
        }),
        'current': ({
            'some pants': ({
                '_meta': ({
                    'type': 'string'
                }),
                'current': 'llama'
            })
        }),
        'reference': ({
            'some pants': ({
                '_meta': ({
                    'type': 'string'
                }),
                'current': 'llama'
            })
        })
    }),
    'throw check': ({
        '_meta': ({
            'type': 'string'
        }),
        'current': 'pants: Expected \'pants\' to equal \'super llama\'.',
        'reference': 'pants: Expected \'pants\' to equal \'super llama\'.'
    }),
    'throw check did throw': ({
        '_meta': ({
            'type': 'boolean'
        }),
        'current': true,
        'reference': true
    }),
    'falsy reject': ({
        '_meta': ({
            'type': 'string'
        }),
        'current': 'falsy check: Expected \'undefined\' to equal \'false\'.',
        'reference': 'falsy check: Expected \'undefined\' to equal \'false\'.'
    }),
    'falsy reject did throw': ({
        '_meta': ({
            'type': 'boolean'
        }),
        'current': true,
        'reference': true
    }),
    'undef': ({
        '_meta': ({
            'type': 'undefined'
        }),
        'current': undefined,
        'reference': undefined
    }),
    'comparator reject': ({
        '_meta': ({
            'type': 'string'
        }),
        'current': 'diff comparator: Expected \'moosle\' to equal \'moosle0\'.',
        'reference': 'diff comparator: Expected \'moosle\' to equal \'moosle0\'.'
    }),
    'comparator didThrow': ({
        '_meta': ({
            'type': 'boolean'
        }),
        'current': true,
        'reference': true
    })
})
