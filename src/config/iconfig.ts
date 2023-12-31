export interface Iconfig<U> {
  get<T extends keyof U>(key: T): U[T];
}
