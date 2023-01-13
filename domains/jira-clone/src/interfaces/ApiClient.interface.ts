export default interface ApiClient<T> {
  status: number;
  data: T;
}
