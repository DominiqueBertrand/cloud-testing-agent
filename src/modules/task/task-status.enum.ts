/**
 * Enum representing the status of a tast.
 */
export enum TaskStatus {
  /**
   * The task is open.
   */
  OPEN = 'OPEN',

  /**
   * The task is in progress.
   */
  IN_PROGRESS = 'IN_PROGRESS',

  /**
   * The task is done.
   */
  DONE = 'DONE',
}

export enum TaskType {
  ONESHOT = 'ONESHOT',
  SCHEDULED = 'SCHEDULED',
}
