import { MarkerStatus } from '../models/markerStatus.enum';
import { Job } from '../models/job.model';
import { Dictionary } from '../helpers/dictionary.type';
import { Subject } from 'rxjs/Rx';
export class JobsService {
    jobsChanged = new Subject<Job[]>();
    private jobs: Dictionary<Job> = new Dictionary<Job>();

    constructor() {
        // Load sample jobs
        this.jobs.add("1", new Job("1", "Some address", MarkerStatus.Plotting, 90, 51.529865, -0.128092))
        this.jobs.add("2", new Job("2", "Some address", MarkerStatus.Plotting, 90, 51.539865, -0.128092))
        this.jobs.add("3", new Job("3", "Some address", MarkerStatus.Plotting, 90, 51.549865, -0.128092))
        this.jobs.add("4", new Job("4", "Some address", MarkerStatus.Plotting, 90, 51.559865, -0.128092))
    }

    getJobs() {
        return this.jobs.values();
    }

    addJob(newJob: Job) {
        this.jobs.add(newJob.id, newJob);
        this.emitJobsChanged();
    }

    // use a dict later
    deleteJobById(id: string) {
        this.jobs.remove(id);
        this.emitJobsChanged();
    }

    private emitJobsChanged() {
        this.jobsChanged.next(this.jobs.values());
    }
}