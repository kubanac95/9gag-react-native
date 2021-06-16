import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { Platform } from "react-native";

import * as Crypto from "expo-crypto";

const logRequest = ({
  config,
  response,
}: {
  config: AxiosRequestConfig;
  response: any;
}) => {
  // Request
  console.groupCollapsed("request");
  console.log(
    "data: ",
    typeof config?.data === "string" ? JSON.parse(config?.data) : config?.data,
  );
  console.log("data json: ", config?.data);
  console.log("params: ", config?.params);
  console.groupEnd();

  // Response
  console.groupCollapsed("response");
  console.log("data: ", response?.data);
  console.log("status: ", response?.status);
  console.groupEnd();
};

const logResponse = (response: AxiosResponse) => {
  if (!__DEV__) {
    return;
  }

  console.groupCollapsed(
    `%c[API - ${response?.config?.method}] response: ${response?.config?.url}`,
    `color: #6ECDA5`,
  );

  logRequest({ config: response?.config, response });

  console.groupEnd();
};

const logError = (error: AxiosError) => {
  if (!__DEV__) {
    return;
  }

  console.groupCollapsed(
    `%c[API - ${error.config.method}] error: ${error.config.url}`,
    `color: #EE3024`,
  );

  logRequest({ config: error.config, response: error.response });

  console.log("response status: ", error.response?.status);

  console.groupEnd();
};

const onResponseFulfilled = (response: AxiosResponse) => {
  logResponse(response);

  return response;
};

const onResponseRejected = (error: AxiosError) => {
  logError(error);

  return Promise.reject(error);
};

const apiV1 = axios.create({
  baseURL: "https://9gag.com/v1",
});

apiV1.interceptors.response.use(onResponseFulfilled, onResponseRejected);

const DEVICE_UUID = "1623869681328-f79f46b7-5306-4e87-92e6-7d857545c356";

const apiV2 = axios.create({
  baseURL: "https://api.9gag.com/v2",
  headers: {
    "X-Package-ID": "com.ninegag.android.app",
    "X-Device-UUID": `v1-${DEVICE_UUID}`,
    "9GAG-9GAG-TOKEN": "Y29tLm5pbmVnYWcuYW5kcm9pZC5hcHAqMjJlMjExMzkz",
    "9GAG-APP_ID": "com.ninegag.android.app",
    "9GAG-DEVICE_TYPE": Platform.OS,
    "9GAG-DEVICE_UUID": `v1-${DEVICE_UUID}`,
  },
});

apiV2.interceptors.request.use(async (config) => {
  /**
   * https://www.reddit.com/r/9gag/comments/66l1a3/digging_into_actual_9gag_api/
   *
   * https://github.com/and3rson/nineapi/blob/master/nineapi/client.py
   *
   * A man, a legend has decoded the request signature
   * sha1 algorithm!
   *
   * Kudos to him!
   *
   */

  const timestamp = dayjs().valueOf();

  config.headers["9GAG-TIMESTAMP"] = timestamp;

  const signature = [
    "*",
    config.headers["9GAG-TIMESTAMP"],
    "_._",
    config.headers["9GAG-APP_ID"],
    "._.",
    config.headers["9GAG-DEVICE_UUID"],
    "9GAG",
  ].join("");

  const requestSignature = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA1,
    signature,
  );

  config.headers["9GAG-REQUEST-SIGNATURE"] = requestSignature;

  return Promise.resolve(config);
});

apiV2.interceptors.response.use(onResponseFulfilled, onResponseRejected);

export const api = {
  v1: apiV1,
  v2: apiV2,
};

const commentV2 = axios.create({
  baseURL: "https://comment-cdn.9gag.com/v2",
  headers: {
    "X-Package-ID": "com.ninegag.android.app",
    "X-Device-UUID": `v1-${DEVICE_UUID}`,
  },
});

commentV2.interceptors.request.use(async (config) => {
  config.params = {
    appId: "a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b",
    ...config.params,
  };

  console.log(config);
  return Promise.resolve(config);
});

commentV2.interceptors.response.use(onResponseFulfilled, onResponseRejected);

export const comment = {
  v2: commentV2,
};
