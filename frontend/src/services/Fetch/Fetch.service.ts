import fetchIntercept from "fetch-intercept";
import type { IDelete, IGet, IPath, IPost, IPut } from "./Fetch.interface";

// const { requestError, requestTokenError } = useFeedbackDialog()

fetchIntercept.register({
  request: function (url, config) {
    // Modify the url or config here
    return [url, config];
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: function (response) {
    // Modify the reponse object
    return response;
  },

  responseError: function (error) {
    // Handle an fetch error
    return Promise.reject(error);
  },
});

async function get<T>(props: IGet): Promise<T> {
  const res = await fetch(props.url, {
    method: "GET",
    headers: props.headers,
    ...(props.cacheTag
      ? {
          next: {
            tags: [props.cacheTag],
          },
        }
      : {}),
  });

  return res.json() as T;
}

function put(props: IPut): Promise<Response> {
  return fetch(props.url, {
    method: "PUT",
    body: JSON.stringify(props.data),
    headers: props.headers,
  });
}

async function post<T>(props: IPost): Promise<T> {
  const res = await fetch(props.url, {
    method: "POST",
    body: JSON.stringify(props.data),
    headers: props.headers,
  });

  return res.json() as T;
}

function patch(props: IPath): Promise<Response> {
  return fetch(props.url, {
    method: "PATCH",
    body: JSON.stringify(props.data),
    headers: props.headers,
  });
}

function deletes(props: IDelete): Promise<Response> {
  return fetch(props.url, {
    method: "DELETE",
    headers: props.headers,
  });
}

const httpModule = { get, put, post, patch, delete: deletes };
export default httpModule;
