import { Job, Queue, Worker } from 'bullmq';
import { Container, Inject, Service } from 'typedi';
import IORedis from 'ioredis';

import Logger from '@/core/logger';
import env from '@/config/env';
import MailService from '@/modules/mailer/mail.service';
import { JobData } from '@/modules/mailer/mail.type';
import { SystemError } from '@/core/errors/CommonError';
import { DILogger } from '@/loaders/loggerLoader';

@Service()
export class MailJob {
  private readonly redisConnection: IORedis.Redis;
  private readonly worker: Worker;
  private queue: Queue;

  constructor(@Inject(DILogger) private logger: Logger) {
    // Init Redis connection
    this.redisConnection = new IORedis(env.REDIS_URI, { maxRetriesPerRequest: null, enableReadyCheck: false });

    // Init Worker
    this.worker = new Worker('send-email', MailJob.workerProcessor, {
      connection: this.redisConnection,
      concurrency: 20,
      limiter: {
        max: 10,
        duration: 1000,
      },
    });
    this.initWorkerListeners(this.worker);

    // Init Queue
    this.queue = new Queue('send-email', {
      connection: this.redisConnection,
      defaultJobOptions: {
        // The total number of attempts to try the job until it completes
        attempts: 5,
        // Backoff setting for automatic retries if the job fails
        backoff: { type: 'exponential', delay: 3000 },
      },
    });
  }

  /**
   * Define worker processor
   * @private
   */
  private static async workerProcessor(job: Job<JobData>): Promise<void> {
    const mailService = Container.get(MailService);
    const { data: jobData } = job;

    switch (jobData.name) {
      case 'request-password-reset':
        return await mailService.sendRequestPasswordReset(jobData.data.to, jobData.data.params);
      case 'request-email-verification':
        return await mailService.sendRequestEmailVerification(jobData.data.to, jobData.data.params);
      case 'password-changed':
        return await mailService.sendPasswordChangedConfirmation(jobData.data.to, jobData.data.params);
      case 'request-email-change':
        return await mailService.sendRequestEmailChange(jobData.data.to, jobData.data.params);
      case 'confirm-request':
        return await mailService.sendConfirmRequestCode(jobData.data.to, jobData.data.params);
      case 'giving-request-subscription':
        return await mailService.sendGivingRequestSubscription(jobData.data.to, jobData.data.params);
      case 'specified-giving-request-subscription':
        return await mailService.sendSpecifiedGivingRequestSubscription(jobData.data.to, jobData.data.params);
      case 'confirm-order':
        return await mailService.sendConfirmOrder(jobData.data.to, jobData.data.params);
      default:
        throw new SystemError('Invalid job name');
    }
  }

  /**
   * Initialize Worker listeners
   * @private
   */
  private initWorkerListeners(worker: Worker) {
    // Completed
    worker.on('completed', (job: Job<JobData>) => {
      this.logger.debug('[job:completed]', { id: job.id });
    });
    // Failed
    worker.on('failed', (job: Job<JobData>, error: Error) => {
      this.logger.error('[job:error]', { jobId: job.id, error });
    });
  }

  /**
   * Add a job to queue
   */
  addJob(payload: JobData) {
    this.queue
      .add(payload.name, payload)
      .then((job) => this.logger.debug(`[addJob:success]`, { id: job.id, payload }))
      .catch((err) => this.logger.error(`[addJob:error]`, err, payload));
  }

  /**
   * Get Redis connection
   */
  get connection() {
    return this.redisConnection;
  }
}
