export default interface AutocompleteQueryFunction {
  (searchQuery: string): Promise<[]>;
}
