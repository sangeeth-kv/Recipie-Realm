
export type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};