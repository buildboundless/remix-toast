# Remix Toast
![GitHub Repo stars](https://img.shields.io/github/stars/Code-Forge-Net/remix-toast?style=social)
![npm](https://img.shields.io/npm/v/remix-toast?style=plastic)
![GitHub](https://img.shields.io/github/license/Code-Forge-Net/remix-toast?style=plastic)
![npm](https://img.shields.io/npm/dy/remix-toast?style=plastic) 
![GitHub top language](https://img.shields.io/github/languages/top/Code-Forge-Net/remix-toast?style=plastic) 

Simple server-side toast management library for Remix.run!

This library provides you with all the essential utilities that you might need to
show toast notifications to your users. The client side implementation is completely
up to you and you can use any library that you want to show the toasts.

The server function uses @remix-run/server-runtime primitives to create a cookie session so this
library is server agnostic and should work with any server setup.

If you wish to read an in depth explanation of how this works you can find it here:
https://alemtuzlak.hashnode.dev/handling-toasts-in-remix



## Installation

```bash
npm install remix-toast
```

## Setup

### Server-side

In order to be able to show toasts anywhere in the app you need to add the following code to your `root.tsx` file.

```tsx
import { getToast } from "remix-toast";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Extracts the toast from the request
  const { toast, headers } = await getToast(request);
  // Important to pass in the headers so the toast is cleared properly
  return json({ toast }, { headers });
}

export default function App({ children }: { children: ReactNode }) {
  const { toast } = useLoaderData<typeof loader>();
  
  useEffect(() => {
   if(toast){
    // Call your toast function here
    alert(toast.message);
   }
  }, [toast])

  return (
    ...
  );
}
```
### Client-side

After this you can then use any toast notification library you prefer, but here are some examples:

#### react-toastify

```tsx
import { json, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { getToast } from "remix-toast";
import { ToastContainer, toast as notify } from "react-toastify";
import toastStyles from "react-toastify/dist/ReactToastify.css";

// Add the toast stylesheet
export const links: LinksFunction = () => [{ rel: "stylesheet", href: toastStyles }];
// Implemented from above
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { toast, headers } = await getToast(request);
  return json({ toast }, { headers });
};

export default function App() {
  const { toast } = useLoaderData<typeof loader>();
  // Hook to show the toasts
  useEffect(() => {
    if (toast) {
      // notify on a toast message
      notify(toast.message, { type: toast.type });
    }
  }, [toast]);

  return (
    <html lang="en">
      <head>
        ...
      </head>
      <body>
        ...
        {/* Add the toast container */}
        <ToastContainer />
      </body>
    </html>
  );
}

```

![react-toastify](./assets/react-toastify.gif) 

#### Sonner

```tsx
import { json, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { getToast } from "remix-toast";
import { Toaster, toast as notify } from "sonner"; 
 
// Implemented from above
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { toast, headers } = await getToast(request);
  return json({ toast }, { headers });
};

export default function App() {
  const { toast } = useLoaderData<typeof loader>();
  // Hook to show the toasts
   useEffect(() => {
    if (toast?.type === "error") {
      notify.error(toast.message);
    }
    if (toast?.type === "success") {
      notify.success(toast.message);
    }
  }, [toast]);

  return (
    <html lang="en">
      <head>
        ...
      </head>
      <body>
        ...
        {/* Add the toast container */}
        <ToastContainer />
      </body>
    </html>
  );
}

```

![react-toastify](./assets/sonner.gif) 

## Utilities

### redirectWithToast

General function that allows you to redirect to a new route and show a toast message.

```tsx
import { redirectWithToast } from "remix-toast";

export const action = () => {
  return redirectWithToast("/login", { message: "You need to login to access this page", type: "error" });
}

```

### redirectWithSuccess

Redirects to a new route and shows a success toast message.

```tsx
import { redirectWithSuccess } from "remix-toast";

export const action = () => {
  return redirectWithSuccess("/login", "You are logged in!");
}

```

### redirectWithError

Redirects to a new route and shows an error toast message.

```tsx

import { redirectWithError } from "remix-toast";

export const action = () => {
  return redirectWithError("/login", "You need to login to access this page");
}

```

### redirectWithInfo

Redirects to a new route and shows an info toast message.

```tsx
import { redirectWithInfo } from "remix-toast";

export const action = () => {
  return redirectWithInfo("/login", "You need to login to access this page");
}

```

### redirectWithWarning

Redirects to a new route and shows a warning toast message.

```tsx

import { redirectWithWarning } from "remix-toast";

export const action = () => {
  return redirectWithWarning("/login", "You need to login to access this page");
}

```

# Thank you


If you wish to support this project you can do so by starring this repository and sharing it with your friends.

Thanks to all the contributors on this project and the support to the community. You guys are awesome!