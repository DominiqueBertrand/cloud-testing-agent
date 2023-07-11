/**
 * Enum representing the status of a test.
 */
export enum TestStatus {
  /**
   * The test is running.
   */
  RUNNING = 'RUNNING',

  /**
   * The test is done and successful.
   */
  SUCCESS = 'SUCCESS',

  /**
   * The test is done but has failed.
   */
  FAILED = 'FAILED',
}
