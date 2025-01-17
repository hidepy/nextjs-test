// 参考: https://zenn.dev/uhyo/books/react-concurrent-handson/viewer/data-fetching-2
// 汎用データ取得hook
const dataMap: Map<string, unknown> = new Map();

export function useData<T>(cacheKey: string, fetcher: () => Promise<T>): T {
    const cachedData = dataMap.get(cacheKey) as T | undefined;

    if (cachedData === undefined) {
        throw fetcher().then(data => dataMap.set(cacheKey, data))
    }

    return cachedData
}
