// src/index.ts
import { createCookieSessionStorageFactory, createCookieFactory, redirect } from "@remix-run/server-runtime";

// src/schema.ts
import { z } from "zod";
var toastMessageSchema = z.object({
  message: z.string(),
  type: z.custom()
});
var flashSessionValuesSchema = z.object({
  toast: toastMessageSchema.optional()
});

// src/crypto.ts
async function sign(value, secret) {
  return value + ".";
}
async function unsign(signed, secret) {
  let index = signed.lastIndexOf(".");
  let value = signed.slice(0, index);
  return value;
}

// src/index.ts
import { json } from "@remix-run/node";
var FLASH_SESSION = "flash";
var createCookie = createCookieFactory({ sign, unsign });
var sessionStorage = createCookieSessionStorageFactory(createCookie)({
  cookie: {
    name: "toast-session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3Cr3t"]
  }
});
function getSessionFromRequest(request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function flashMessage(flash, headers) {
  const session = await sessionStorage.getSession();
  session.flash(FLASH_SESSION, flash);
  const cookie = await sessionStorage.commitSession(session);
  const newHeaders = new Headers(headers);
  newHeaders.append("Set-Cookie", cookie);
  return newHeaders;
}
async function redirectWithFlash(url, flash, init) {
  return redirect(url, {
    ...init,
    headers: await flashMessage(flash, init == null ? void 0 : init.headers)
  });
}
function redirectWithToast(url, toast, init) {
  return redirectWithFlash(url, { toast }, init);
}
function redirectWithError(redirectUrl, message, init) {
  return redirectWithToast(redirectUrl, { message: `${message}`, type: "error" }, init);
}
function redirectWithSuccess(redirectUrl, message, init) {
  return redirectWithToast(redirectUrl, { message: `${message}`, type: "success" }, init);
}
function redirectWithWarning(redirectUrl, message, init) {
  return redirectWithToast(redirectUrl, { message: `${message}`, type: "warning" }, init);
}
function redirectWithInfo(redirectUrl, message, init) {
  return redirectWithToast(redirectUrl, { message: `${message}`, type: "info" }, init);
}
var jsonWithFlash = async (data, flash, init) => {
  return json(data, {
    ...init,
    headers: await flashMessage(flash, init == null ? void 0 : init.headers)
  });
};
var jsonWithToast = async (data, toast, init) => {
  return jsonWithFlash(data, { toast }, init);
};
var jsonWithSuccess = async (data, message, init) => {
  return jsonWithToast(data, { message, type: "success" }, init);
};
var jsonWithError = async (data, message, init) => {
  return jsonWithToast(data, { message, type: "error" }, init);
};
var jsonWithInfo = async (data, message, init) => {
  return jsonWithToast(data, { message, type: "info" }, init);
};
var jsonWithWarning = async (data, message, init) => {
  return jsonWithToast(data, { message, type: "warning" }, init);
};
async function getToast(request) {
  const session = await getSessionFromRequest(request);
  const result = flashSessionValuesSchema.safeParse(session.get(FLASH_SESSION));
  const flash = result.success ? result.data : void 0;
  const headers = new Headers({
    "Set-Cookie": await sessionStorage.commitSession(session)
  });
  const toast = flash == null ? void 0 : flash.toast;
  return { toast, headers };
}
export {
  getToast,
  jsonWithError,
  jsonWithFlash,
  jsonWithInfo,
  jsonWithSuccess,
  jsonWithToast,
  jsonWithWarning,
  redirectWithError,
  redirectWithInfo,
  redirectWithSuccess,
  redirectWithToast,
  redirectWithWarning
};
