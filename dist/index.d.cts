import * as _remix_run_server_runtime from '@remix-run/server-runtime';
import { z } from 'zod';
import { TypedResponse } from '@remix-run/node';

declare const toastMessageSchema: z.ZodObject<{
    message: z.ZodString;
    type: z.ZodType<"info" | "success" | "error" | "warning", z.ZodTypeDef, "info" | "success" | "error" | "warning">;
}, "strip", z.ZodTypeAny, {
    message: string;
    type: "info" | "success" | "error" | "warning";
}, {
    message: string;
    type: "info" | "success" | "error" | "warning";
}>;
declare const flashSessionValuesSchema: z.ZodObject<{
    toast: z.ZodOptional<z.ZodObject<{
        message: z.ZodString;
        type: z.ZodType<"info" | "success" | "error" | "warning", z.ZodTypeDef, "info" | "success" | "error" | "warning">;
    }, "strip", z.ZodTypeAny, {
        message: string;
        type: "info" | "success" | "error" | "warning";
    }, {
        message: string;
        type: "info" | "success" | "error" | "warning";
    }>>;
}, "strip", z.ZodTypeAny, {
    toast?: {
        message: string;
        type: "info" | "success" | "error" | "warning";
    } | undefined;
}, {
    toast?: {
        message: string;
        type: "info" | "success" | "error" | "warning";
    } | undefined;
}>;
type ToastMessage = z.infer<typeof toastMessageSchema>;
type FlashSessionValues = z.infer<typeof flashSessionValuesSchema>;

/**
 * Helper method used to redirect the user to a new page with a toast notification
 *
 * If thrown it needs to be awaited
 * @param url Redirect URL
 * @param toast Toast message and it's type
 * @param init Additional response options (status code, additional headers etc)
 * @returns Returns redirect response with toast cookie set
 */
declare function redirectWithToast(url: string, toast: ToastMessage, init?: ResponseInit): Promise<_remix_run_server_runtime.TypedResponse<never>>;
/**
 * Helper method used to redirect the user to a new page with an error toast notification
 *
 * If this method is thrown it needs to be awaited, otherwise it can just be returned
 * @param redirectUrl Redirect url
 * @param message Message to be shown as info
 * @param init Additional response options (status code, additional headers etc)
 * @returns Returns redirect response with toast cookie set
 */
declare function redirectWithError(redirectUrl: string, message: string, init?: ResponseInit): Promise<_remix_run_server_runtime.TypedResponse<never>>;
/**
 * Helper method used to redirect the user to a new page with a success toast notification
 *
 * If this method is thrown it needs to be awaited, otherwise it can just be returned
 * @param redirectUrl Redirect url
 * @param message Message to be shown as info
 * @param init Additional response options (status code, additional headers etc)
 * @returns Returns redirect response with toast cookie set
 */
declare function redirectWithSuccess(redirectUrl: string, message: string, init?: ResponseInit): Promise<_remix_run_server_runtime.TypedResponse<never>>;
/**
 * Helper method used to redirect the user to a new page with a warning toast notification
 *
 * If this method is thrown it needs to be awaited, otherwise it can just be returned
 * @param redirectUrl Redirect url
 * @param message Message to be shown as info
 * @param init Additional response options (status code, additional headers etc)
 * @returns Returns redirect response with toast cookie set
 */
declare function redirectWithWarning(redirectUrl: string, message: string, init?: ResponseInit): Promise<_remix_run_server_runtime.TypedResponse<never>>;
/**
 * Helper method used to redirect the user to a new page with a info toast notification
 *
 * If this method is thrown it needs to be awaited, otherwise it can just be returned
 * @param redirectUrl Redirect url
 * @param message Message to be shown as info
 * @param init Additional response options (status code, additional headers etc)
 * @returns Returns redirect response with toast cookie set
 */
declare function redirectWithInfo(redirectUrl: string, message: string, init?: ResponseInit): Promise<_remix_run_server_runtime.TypedResponse<never>>;
type JsonWithFlashFunction = <Data>(data: Data, flash: FlashSessionValues, init?: ResponseInit) => Promise<TypedResponse<Data>>;
type JsonWithToastFunction = <Data>(data: Data, toast: ToastMessage, init?: ResponseInit) => Promise<TypedResponse<Data>>;
type JsonWithToastMessageFunction = <Data>(data: Data, message: string, init?: ResponseInit) => Promise<TypedResponse<Data>>;
declare const jsonWithFlash: JsonWithFlashFunction;
declare const jsonWithToast: JsonWithToastFunction;
declare const jsonWithSuccess: JsonWithToastMessageFunction;
declare const jsonWithError: JsonWithToastMessageFunction;
declare const jsonWithInfo: JsonWithToastMessageFunction;
declare const jsonWithWarning: JsonWithToastMessageFunction;
/**
 * Helper method used to get the toast data from the current request and purge the flash storage from the session
 * @param request Current request
 * @returns Returns the the toast notification if exists, undefined otherwise and the headers needed to purge it from the session
 */
declare function getToast(request: Request): Promise<{
    toast: ToastMessage | undefined;
    headers: Headers;
}>;

export { JsonWithFlashFunction, JsonWithToastFunction, JsonWithToastMessageFunction, ToastMessage, getToast, jsonWithError, jsonWithFlash, jsonWithInfo, jsonWithSuccess, jsonWithToast, jsonWithWarning, redirectWithError, redirectWithInfo, redirectWithSuccess, redirectWithToast, redirectWithWarning };
