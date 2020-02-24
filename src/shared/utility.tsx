export const updateObject = <T extends object>(
    oldObject: T,
    updatedProperties: T,
): T => {
    const newObject = {
        ...oldObject,
        ...((updatedProperties as unknown) as object),
    } as T;

    return newObject;
};

export default updateObject;
