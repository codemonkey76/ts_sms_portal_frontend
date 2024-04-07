import { ref } from "vue";

type ErrorMessages = Record<string, string[]>;

const useValidation = () => {
    let errorRecords: ErrorMessages = {};

    const setErrors = (newErrors: ErrorMessages) => {
        errorRecords = newErrors;
    };

    const clearErrors = () => {
        errorRecords = {};
    };

    const errors = {
        first: (field: string): string | undefined => {
            return errorRecords[field] ? errorRecords[field][0] : undefined;
        },
        has: (field: string): boolean => {
            return Boolean(errorRecords[field] && errorRecords[field].length);
        },
        all: (): ErrorMessages => {
            return errorRecords;
        },
    };

    return { errors, setErrors, clearErrors };
};

export default useValidation;
