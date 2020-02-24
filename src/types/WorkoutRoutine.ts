export interface IWorkoutRoutine {
    [key: number]: {
        id: number;
        day: number;
        exercises: IExercise[];
    };
}

export interface IExercise {
    id: number;
    tier: number;
    type: IExerciseType;
    result: IExerciseResult;
}

export interface IExerciseType {
    id: number;
    name: string;
    description?: string;
}

export interface IExerciseResult {
    shortDesc: string;
    repCount: number;
    repWeight: number;
    seriesCount: number;
    amrap?: boolean;
    metric?: boolean;
}
