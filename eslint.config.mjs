import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		rules: {
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{ prefer: 'type-imports', fixStyle: 'inline-type-imports' }
			],
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			// A static export has no image optimizer, so plain <img> tags are correct here.
			'@next/next/no-img-element': 'off'
		}
	},
	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'public/**'])
]);

export default eslintConfig;
