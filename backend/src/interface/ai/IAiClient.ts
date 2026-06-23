export interface IAiClient {
  generate(prompt: string): Promise<string | undefined>;
}