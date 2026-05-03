"use client";

/**
 * Restaurant partner signup: email → name → password → confirm → restaurant details.
 * Calls POST /auth/register-restaurant-owner (then same email verification as customer signup).
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { IoArrowBack } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { setPendingVerificationEmail } from "@/lib/auth/pending-verification";
import { AuthContext } from "@/providers/AuthProvider";

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const PASSWORD_PATTERN =
  /^(?=.*[0-9])(?=.*[-?!@#$%^&*/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9-?!@#$%^&*/\\]{8,30}$/;

/** @typedef {'email' | 'name' | 'password' | 'confirm' | 'restaurant'} PartnerStep */

export default function RestaurantPartnerSignUpWizard({
  layout = "modal",
  onBackToEntry,
  onSwitchToLogin,
  initialEmail = "",
}) {
  const { t } = useTranslation("auth");
  const titleId = useId();
  const descId = useId();
  const inputRef = useRef(null);
  const router = useRouter();
  const { closeAuthModal, openAuthModal } = useAuthModal();
  const { registerRestaurantOwner } = useContext(AuthContext);

  const [step, setStep] = useState(
    /** @type PartnerStep */ ("email")
  );
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const isModal = layout === "modal";

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  useEffect(() => {
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [step]);

  const emailValid = EMAIL_RE.test(email.trim());
  const nameOk = name.trim().length >= 2;
  const passwordOk =
    password.length >= 8 && PASSWORD_PATTERN.test(password);
  const confirmOk =
    confirmPassword === password && confirmPassword.length > 0;
  const restaurantOk =
    restaurantName.trim().length >= 1 && restaurantName.trim().length <= 200;
  const phoneOk = phone.trim().length <= 40;

  const goBack = useCallback(() => {
    setFieldError("");
    if (step === "name") {
      setStep("email");
      return;
    }
    if (step === "password") {
      setStep("name");
      return;
    }
    if (step === "confirm") {
      setStep("password");
      return;
    }
    if (step === "restaurant") {
      setStep("confirm");
      return;
    }
    if (step === "email") {
      if (isModal && onBackToEntry) onBackToEntry();
      else router.back();
    }
  }, [step, isModal, onBackToEntry, router]);

  const handleEmailNext = (e) => {
    e.preventDefault();
    if (!emailValid) return;
    setFieldError("");
    setStep("name");
  };

  const handleNameNext = (e) => {
    e.preventDefault();
    if (!nameOk) return;
    setFieldError("");
    setStep("password");
  };

  const handlePasswordNext = (e) => {
    e.preventDefault();
    if (!PASSWORD_PATTERN.test(password)) {
      setFieldError(t("signupPasswordRuleError"));
      return;
    }
    setFieldError("");
    setStep("confirm");
  };

  const handleConfirmNext = (e) => {
    e.preventDefault();
    if (!confirmOk) {
      setFieldError(t("signupPasswordMismatch"));
      return;
    }
    if (!PASSWORD_PATTERN.test(password)) {
      setFieldError(t("signupPasswordInvalid"));
      return;
    }
    setFieldError("");
    setStep("restaurant");
  };

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantOk) {
      setFieldError(t("partnerRestaurantNameError"));
      return;
    }
    if (!phoneOk) {
      setFieldError(t("partnerPhoneTooLong"));
      return;
    }
    if (!registerRestaurantOwner) return;
    setSubmitting(true);
    setFieldError("");
    try {
      await registerRestaurantOwner({
        email: email.trim(),
        password,
        name: name.trim(),
        restaurantName: restaurantName.trim(),
        primaryCategory: primaryCategory.trim() || undefined,
        phone: phone.trim() || undefined,
      });
      setPendingVerificationEmail(email.trim());
      const verifyUrl = `/verify-email?email=${encodeURIComponent(email.trim())}`;
      if (isModal) closeAuthModal();
      router.push(verifyUrl);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: t("signupVerifyEmailToast"),
        showConfirmButton: false,
        timer: 2200,
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        t("signupRegistrationFailed");
      setFieldError(
        typeof msg === "string" ? msg : t("signupRegistrationFailed")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const cardClass =
    "w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:rounded-3xl sm:p-8 md:max-w-[420px]";

  const inputClass =
    "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-brand-dark placeholder:text-neutral-400 outline-none transition-[box-shadow,border-color] focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25";

  const primaryBtn = (enabled) =>
    `w-full rounded-xl py-3.5 text-center text-base font-semibold transition-colors ${
      enabled && !submitting
        ? "cursor-pointer bg-brand-primary text-white hover:bg-brand-primary/90"
        : "cursor-not-allowed bg-neutral-200 text-white"
    }`;

  const partnerAccentBtn = (enabled) =>
    `w-full rounded-xl py-3.5 text-center text-base font-semibold transition-colors ${
      enabled && !submitting
        ? "cursor-pointer bg-[#0f766e] text-white hover:bg-[#115e59]"
        : "cursor-not-allowed bg-neutral-200 text-white"
    }`;

  const stepMeta = {
    email: {
      title: t("signupEmailTitle"),
      subtitle: t("partnerSignupEmailSubtitle"),
      form: (
        <form onSubmit={handleEmailNext} className="mt-6 space-y-4">
          <label className="sr-only" htmlFor="rp-email">
            {t("signupPlaceholderEmail")}
          </label>
          <input
            ref={inputRef}
            id="rp-email"
            type="email"
            autoComplete="email"
            placeholder={t("signupPlaceholderEmail")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldError("");
            }}
            className={inputClass}
          />
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!emailValid || submitting}
            className={primaryBtn(emailValid)}
          >
            {t("signupContinue")}
          </button>
        </form>
      ),
    },
    name: {
      title: t("partnerSignupOwnerNameTitle"),
      subtitle: t("partnerSignupOwnerNameSubtitle"),
      form: (
        <form onSubmit={handleNameNext} className="mt-6 space-y-4">
          <label className="sr-only" htmlFor="rp-name">
            {t("signupPlaceholderName")}
          </label>
          <input
            ref={inputRef}
            id="rp-name"
            type="text"
            autoComplete="name"
            placeholder={t("signupPlaceholderName")}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFieldError("");
            }}
            className={inputClass}
          />
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!nameOk || submitting}
            className={primaryBtn(nameOk)}
          >
            {t("signupContinue")}
          </button>
        </form>
      ),
    },
    password: {
      title: t("signupPasswordTitle"),
      subtitle: t("signupPasswordSubtitle"),
      form: (
        <form onSubmit={handlePasswordNext} className="mt-6 space-y-4">
          <label className="sr-only" htmlFor="rp-password">
            {t("signupPlaceholderPassword")}
          </label>
          <input
            ref={inputRef}
            id="rp-password"
            type="password"
            autoComplete="new-password"
            placeholder={t("signupPlaceholderPassword")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldError("");
            }}
            className={inputClass}
          />
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!passwordOk || submitting}
            className={primaryBtn(passwordOk)}
          >
            {t("signupContinue")}
          </button>
        </form>
      ),
    },
    confirm: {
      title: t("signupConfirmTitle"),
      subtitle: t("signupConfirmSubtitle"),
      form: (
        <form onSubmit={handleConfirmNext} className="mt-6 space-y-4">
          <label className="sr-only" htmlFor="rp-confirm">
            {t("signupPlaceholderConfirm")}
          </label>
          <input
            ref={inputRef}
            id="rp-confirm"
            type="password"
            autoComplete="new-password"
            placeholder={t("signupPlaceholderConfirm")}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setFieldError("");
            }}
            className={inputClass}
          />
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!confirmOk || submitting}
            className={primaryBtn(confirmOk)}
          >
            {t("signupContinue")}
          </button>
        </form>
      ),
    },
    restaurant: {
      title: t("partnerSignupRestaurantTitle"),
      subtitle: t("partnerSignupRestaurantSubtitle"),
      form: (
        <form onSubmit={handleRestaurantSubmit} className="mt-6 space-y-4">
          <div>
            <label
              className="mb-1 block text-left text-sm font-medium text-brand-dark"
              htmlFor="rp-restaurant-name"
            >
              {t("partnerSignupRestaurantNameLabel")}
            </label>
            <input
              ref={inputRef}
              id="rp-restaurant-name"
              type="text"
              autoComplete="organization"
              placeholder={t("partnerSignupRestaurantNamePlaceholder")}
              value={restaurantName}
              onChange={(e) => {
                setRestaurantName(e.target.value);
                setFieldError("");
              }}
              className={inputClass}
              maxLength={200}
            />
          </div>
          <div>
            <label
              className="mb-1 block text-left text-sm font-medium text-brand-dark"
              htmlFor="rp-category"
            >
              {t("partnerSignupCategoryLabel")}
            </label>
            <input
              id="rp-category"
              type="text"
              placeholder={t("partnerSignupCategoryPlaceholder")}
              value={primaryCategory}
              onChange={(e) => {
                setPrimaryCategory(e.target.value);
                setFieldError("");
              }}
              className={inputClass}
            />
          </div>
          <div>
            <label
              className="mb-1 block text-left text-sm font-medium text-brand-dark"
              htmlFor="rp-phone"
            >
              {t("partnerSignupPhoneLabel")}
            </label>
            <input
              id="rp-phone"
              type="tel"
              autoComplete="tel"
              placeholder={t("partnerSignupPhonePlaceholder")}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setFieldError("");
              }}
              className={inputClass}
              maxLength={40}
            />
          </div>
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!restaurantOk || !phoneOk || submitting}
            className={partnerAccentBtn(restaurantOk && phoneOk)}
          >
            {submitting ? t("signupCreating") : t("partnerSignupSubmit")}
          </button>
        </form>
      ),
    },
  };

  const meta = stepMeta[step];

  const headerBack =
    step === "email" && !isModal ? (
      <Link
        href="/"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-brand-dark hover:bg-neutral-100"
        aria-label="Back to home"
      >
        <IoArrowBack className="text-xl" />
      </Link>
    ) : (
      <button
        type="button"
        onClick={goBack}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-brand-dark transition-colors hover:bg-neutral-100"
        aria-label="Back"
      >
        <IoArrowBack className="text-xl" />
      </button>
    );

  const inner = (
    <>
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        {headerBack}
        {isModal ? (
          <button
            type="button"
            onClick={closeAuthModal}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-neutral-200 text-brand-muted transition-colors hover:bg-neutral-50"
            aria-label="Close"
          >
            <MdClose className="text-2xl" />
          </button>
        ) : (
          <span className="min-h-11 min-w-11" aria-hidden />
        )}
      </div>

      <div className="mx-auto mb-4 flex h-20 w-full max-w-[140px] items-center justify-center rounded-2xl bg-teal-50 ring-1 ring-teal-100 sm:h-24">
        <span
          className="text-center text-[0.65rem] font-bold uppercase leading-tight tracking-wide text-[#0f766e] sm:text-xs"
          aria-hidden
        >
          {t("partnerSignupBadge")}
        </span>
      </div>

      <h2
        id={titleId}
        className="text-center text-2xl font-bold tracking-tight text-brand-dark"
      >
        {meta.title}
      </h2>
      <p id={descId} className="mt-2 text-center text-sm text-brand-muted">
        {meta.subtitle}
      </p>

      {meta.form}

      <p className="mt-6 text-center text-sm text-brand-muted">
        {t("signupAlreadyHave")}{" "}
        <button
          type="button"
          className="font-semibold text-brand-primary underline-offset-2 hover:underline"
          onClick={() => {
            if (isModal) {
              if (onSwitchToLogin) onSwitchToLogin();
              else openAuthModal("login");
            } else {
              router.push("/login");
            }
          }}
        >
          {t("signupLogIn")}
        </button>
      </p>
    </>
  );

  if (layout === "page") {
    return (
      <div className="min-h-screen bg-brand-background px-4 py-10">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <div className={`${cardClass} mx-auto`}>{inner}</div>
        </div>
      </div>
    );
  }

  return <div className={`${cardClass} mx-auto`}>{inner}</div>;
}
