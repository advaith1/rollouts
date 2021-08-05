type localeMatcher = 'lookup' | 'best fit'

declare namespace Intl {
	/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat */
	class ListFormat {
		public constructor(locales?: string | string[], options?: {
			localeMatcher?: localeMatcher,
			type?: 'conjunction' | 'disjunction' | 'unit',
			style?: 'long' | 'short'
		})
		public static supportedLocalesOf(locales: string | string[], options?: {localeMatcher: localeMatcher}): string[]
		public format: (items: Iterable<any>) => string
		public formatToParts: (list: string[]) => {type: 'element' | 'literal', value: string}[]
	}
}
