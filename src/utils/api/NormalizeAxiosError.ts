import { NormalizedErrorT } from "@/types/auth";
import axios, { AxiosError } from "axios";
import i18n from '@/localization/i18n';


export function normalizeAxiosError(error: unknown): NormalizedErrorT {
  console.log("Current Lang:", i18n.language);

  // Use the global i18n.t function
  const t = (key: string) => i18n.t(`${key}`);

  if (!axios.isAxiosError(error)) {
    return { message: t("normalizedErrors.unexpected") };
  }

  const err = error as AxiosError;

  // ---- A) Server responded with error ----
  if (err.response) {
    const status = err.response.status;

    switch (status) {
      case 401:
        return { message: t("normalizedErrors.authError"), status };
      case 404:
        return { message: t("normalizedErrors.notFound"), status };
      case 500:
        return { message: t("normalizedErrors.serverError"), status };
      default:
        return { message: t("normalizedErrors.defaultServer"), status };
    }
  }

  // ---- B) Request sent but no response ----
  if (err.request) {
    if (err.code === "ERR_NETWORK") {
      return { message: t("normalizedErrors.noNetwork") };
    }
    return { message: t("normalizedErrors.noResponse") };
  }

  return { message: t("normalizedErrors.requestSetup") };
}