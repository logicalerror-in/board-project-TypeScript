import {isNumber, isRecord, isString, isStringArray} from "./commonGuards.ts";

type NestDefaultErrorResponse = {
  message: string | string[];
  error?: string;
  statusCode: number;
};

const isNestDefaultErrorResponse = (value: unknown): value is NestDefaultErrorResponse => {
  if (!isRecord(value)) {
    return false;
  }

  const hasValidMessage =
    isString(value.message) || isStringArray(value.message);

  const hasValidError =
    value.error === undefined || isString(value.error);

  return hasValidMessage && hasValidError && isNumber(value.statusCode);
};

export const getApiErrorMessage = (value: unknown): string | null => {
  if (!isNestDefaultErrorResponse(value)) {
    return null;
  }

  if (Array.isArray(value.message)) {
    return value.message.join(', ');
  }

  return value.message;
};