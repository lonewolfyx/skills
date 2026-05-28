import type { Linter } from 'eslint'
import antfu from '@antfu/eslint-config'

const config = antfu({
    markdown: true,
    stylistic: {
        indent: 4,
        quotes: 'single',
    },
    rules: {
        'node/prefer-global/process': 'off',
        'regexp/no-unused-capturing-group': 'off',
    },
    yaml: {
        overrides: {
            'yaml/indent': ['error', 2],
        },
    },
    ignores: [
        '**/git-commit-message/**',
        '**/review-code-quality/**',
        '**/ts-type-naming/**',
        '**/naming-convention/**',
    ],
}) as Linter.Config

export default config
