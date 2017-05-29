import { Result } from '../../models/result.model';
export interface IAlgorithm{
    start():Result<void>;
    solve():Result<void>;
}