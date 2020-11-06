namespace ts {
    // WARNING: The script `configurePrerelease.ts` uses a regexp to parse out these values.
    // If changing the text in this section, be sure to test `configurePrerelease` too.
    export var versionMajorMinor = "4.2";
    /** The version of the TypeScript compiler release */
    export const version: TFF<G> = tag`${versionMajorMinor}.0-dev`;

	type TYPE = typeof versionMajorMinor;
	type OBJECT<T> = {
		t: T;
		brand: TYPE;
	};
	type U = TYPE extends Array<infer INFER> ? Omit<OBJECT<INFER>, "brand"> : number | string;

    /**
     * Type of objects whose values are all of the same type.
     * The `in` and `for-in` operators can *not* be safely used,
     * since `Object.prototype` may be modified by outside code.
     */
    export interface MapLike<T> {
        [index: string]: T;
    }

    export interface SortedReadonlyArray<T> extends ReadonlyArray<T> {
        " __sortedArrayBrand": any;
    }

    /** Common read methods for ES6 Map/Set. */
    export interface ReadonlyCollection<K> {
        readonly size: number;
        has(key: K): boolean;
        keys(): Iterator<K>;
	}

	const ff = (str: string): number => 0;

	async function F() {
		const i = 0;
		try {
			const g = 0;
			if(g) {

			} else {

			}

		} catch(err) {
			throw new Error("error");
		} finally {

		}
	}

	abstract class CLASS extends PARENT {
		#de: string;

		private async F(): Promise<void> {
			return console.log("logger")
		}
	}
}