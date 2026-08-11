import type {CreatePostRequest, UpdatePostRequest} from "../types/posts.ts";

export type PostFormErrors = {
    title?: string;
    content?: string;
};

const TITLE_MAX_LENGTH = 100;
const CONTENT_MAX_LENGTH = 5000;

const validateTitle = (title: string): string | undefined => {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
        return '제목을 입력해주세요';
    }

    if (trimmedTitle.length > TITLE_MAX_LENGTH) {
        return `제목은 ${TITLE_MAX_LENGTH}자 이하로 입력해주세요`;
    }

    return undefined;
};

const validateContent = (content: string): string | undefined => {
    const trimmedContent = content.trim();

    if (trimmedContent.length === 0) {
        return "내용을 입력해주세요.";
    }

    if (trimmedContent.length > CONTENT_MAX_LENGTH) {
        return `내용은 ${CONTENT_MAX_LENGTH}자 이하로 입력해주세요.`;
    }

    return undefined;
};

export const validateCreatePostForm = (form: CreatePostRequest): PostFormErrors => {
    const errors: PostFormErrors = {};

    const titleError = validateTitle(form.title);
    const contentError = validateContent(form.content);

    if (titleError !== undefined) {
        errors.title = titleError;
    }

    if (contentError !== undefined) {
        errors.content = contentError;
    }

    return errors;
};

export const validateUpdatePostForm = (form: UpdatePostRequest): PostFormErrors => {
    const errors: PostFormErrors = {};

    const titleError = validateTitle(form.title ?? '');
    const contentError = validateContent(form.content ?? '');

    if (titleError !== undefined) {
        errors.title = titleError;
    }

    if (contentError !== undefined) {
        errors.content = contentError;
    }

    return errors;
};

export const hasPostFormErrors = (errors: PostFormErrors): boolean => {
    return errors.title !== undefined || errors.content !== undefined;
};