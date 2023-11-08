"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  getToast: () => getToast,
  jsonWithError: () => jsonWithError,
  jsonWithFlash: () => jsonWithFlash,
  jsonWithInfo: () => jsonWithInfo,
  jsonWithSuccess: () => jsonWithSuccess,
  jsonWithToast: () => jsonWithToast,
  jsonWithWarning: () => jsonWithWarning,
  redirectWithError: () => redirectWithError,
  redirectWithInfo: () => redirectWithInfo,
  redirectWithSuccess: () => redirectWithSuccess,
  redirectWithToast: () => redirectWithToast,
  redirectWithWarning: () => redirectWithWarning
});
module.exports = __toCommonJS(src_exports);
var import_server_runtime = require("@remix-run/server-runtime");

// src/schema.ts
var import_zod = require("zod");
var toastMessageSchema = import_zod.z.object({
  message: import_zod.z.string(),
  type: import_zod.z.custom()
});
var flashSessionValuesSchema = import_zod.z.object({
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
var import_node = require("@remix-run/node");
var FLASH_SESSION = "flash";
var createCookie = (0, import_server_runtime.createCookieFactory)({ sign, unsign });
var sessionStorage = (0, import_server_runtime.createCookieSessionStorageFactory)(createCookie)({
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
  return (0, import_server_runtime.redirect)(url, {
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
  return (0, import_node.json)(data, {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
