({
    'basic assert': ({
        '_meta': ({
            'type': 'object'
        }),
        'reference': ({
            'some pants': ({
                '_meta': ({
                    'type': 'string'
                }),
                'reference': 'llama'
            })
        })
    }),
    'throw check': ({
        '_meta': ({
            'type': 'string'
        }),
        'reference': 'pants: Expected \'pants\' to equal \'super llama\'.'
    }),
    'throw check did throw': ({
        '_meta': ({
            'type': 'boolean'
        }),
        'reference': true
    }),
    'falsy reject': ({
        '_meta': ({
            'type': 'string'
        }),
        'reference': 'falsy check: Expected \'undefined\' to equal \'false\'.'
    }),
    'falsy reject did throw': ({
        '_meta': ({
            'type': 'boolean'
        }),
        'reference': true
    }),
    'undef': ({
        '_meta': ({
            'type': 'undefined'
        }),
        'reference': undefined
    }),
    'comparator a': ({
        '_meta': ({
            'type': 'string'
        }),
        'reference': 'moosle0'
    }),
    'comparator b': ({
        '_meta': ({
            'type': 'string'
        }),
        'reference': 'moosle'
    }),
    'comparator reject': ({
        '_meta': ({
            'type': 'string'
        }),
        'reference': 'diff comparator: Expected \'moosle\' to equal \'moosle0\'.'
    }),
    'comparator didThrow': ({
        '_meta': ({
            'type': 'boolean'
        }),
        'reference': true
    })
})