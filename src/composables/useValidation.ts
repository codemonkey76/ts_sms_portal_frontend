import { reactive } from "vue";

type ErrorMessages = Record<string, string[]>;

const useValidation = () => {
    const errorRecords = reactive<ErrorMessages>({});

    const setErrors = (newErrors: ErrorMessages) => {
        Object.keys(newErrors).forEach(field => {
            errorRecords[field] = newErrors[field];
        });
    };

    const clearErrors = () => {
        Object.keys(errorRecords).forEach(field => {
            delete errorRecords[field];
        });
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
