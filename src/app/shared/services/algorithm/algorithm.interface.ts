import { Result } from '../../models/result.model';
export interface IAlgorithm{
    solve():Result<void>;
}