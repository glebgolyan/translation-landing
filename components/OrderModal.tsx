"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { languages, type Language } from "@/lib/languages";
import { orderRequestApi } from "@/lib/site";

type PreferredContact = "EMAIL" | "VIBER" | "WHATSAPP" | "TELEGRAM";
const PREFERRED_CONTACTS: PreferredContact[] = ["EMAIL", "VIBER", "WHATSAPP", "TELEGRAM"];

type FormValues = {
  sourceLanguage: Language | "";
  targetLanguage: Language | "";
  clientName: string;
  phone: string;
  email: string;
  preferredContact: PreferredContact | "";
};

const emptyValues: FormValues = {
  sourceLanguage: "",
  targetLanguage: "",
  clientName: "",
  phone: "",
  email: "",
  preferredContact: "",
};

type FieldErrors = Partial<Record<keyof FormValues | "files", string>>;

const PHONE_PATTERN = /^[0-9+()\-\s]{5,30}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fileExtension(name: string): string {
  return name.slice(name.lastIndexOf(".") + 1).toLowerCase();
}

function formatBytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function OrderModal({ dict }: { dict: Dictionary }) {
  const t = dict.orderForm;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function openModal() {
    setValues(emptyValues);
    setFiles([]);
    setErrors({});
    setStatus("idle");
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) closeModal();
  }

  function field<K extends keyof FormValues>(key: K) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [key]: event.target.value as FormValues[K] }));
    };
  }

  function onFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (picked.length === 0) return;
    setFiles((prev) => [...prev, ...picked]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};

    if (!values.sourceLanguage) next.sourceLanguage = t.errors.required;
    if (!values.targetLanguage) next.targetLanguage = t.errors.required;

    const name = values.clientName.trim();
    if (!name) next.clientName = t.errors.required;
    else if (name.length > 150) next.clientName = t.errors.clientNameLength;

    const phone = values.phone.trim();
    if (!phone) next.phone = t.errors.required;
    else if (!PHONE_PATTERN.test(phone)) next.phone = t.errors.phoneFormat;

    if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
      next.email = t.errors.emailFormat;
    }

    if (!values.preferredContact) next.preferredContact = t.errors.required;

    if (files.length > orderRequestApi.maxFiles) {
      next.files = t.errors.fileCount;
    } else {
      const oversized = files.find((f) => f.size > orderRequestApi.maxFileSizeBytes);
      const wrongType = files.find(
        (f) => !(orderRequestApi.allowedFileExtensions as readonly string[]).includes(fileExtension(f.name))
      );
      if (oversized) next.files = t.errors.fileSize;
      else if (wrongType) next.files = t.errors.fileType;
    }

    return next;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("sourceLanguage", values.sourceLanguage);
      formData.append("targetLanguage", values.targetLanguage);
      formData.append("clientName", values.clientName.trim());
      formData.append("phone", values.phone.trim());
      if (values.email.trim()) formData.append("email", values.email.trim());
      formData.append("preferredContact", values.preferredContact);
      files.forEach((file) => formData.append("files", file));

      const response = await fetch(orderRequestApi.url, {
        method: "POST",
        headers: { "X-Request-Token": orderRequestApi.requestToken },
        body: formData,
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button type="button" className="orderButton" onClick={openModal}>
        {t.ctaButton}
      </button>

      <dialog ref={dialogRef} className="orderDialog" onClick={onDialogClick} aria-labelledby="order-modal-title">
        <div className="orderDialogInner">
          <button type="button" className="dialogClose" onClick={closeModal} aria-label={t.closeAria}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>

          {status === "success" ? (
            <div className="orderSuccess">
              <h2 id="order-modal-title" className="sectionTitle">
                {t.successTitle}
              </h2>
              <p className="leadText">{t.successMessage}</p>
              <button type="button" className="submitButton" onClick={closeModal}>
                {t.closeButton}
              </button>
            </div>
          ) : (
            <form className="orderForm" onSubmit={onSubmit} noValidate>
              <h2 id="order-modal-title" className="sectionTitle">
                {t.modalTitle}
              </h2>
              <p className="leadText">{t.modalDescription}</p>

              <div className="formRow">
                <label className="formField">
                  <span>{t.sourceLanguageLabel}</span>
                  <select value={values.sourceLanguage} onChange={field("sourceLanguage")}>
                    <option value="">{t.languagePlaceholder}</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  {errors.sourceLanguage && <span className="formError">{errors.sourceLanguage}</span>}
                </label>

                <label className="formField">
                  <span>{t.targetLanguageLabel}</span>
                  <select value={values.targetLanguage} onChange={field("targetLanguage")}>
                    <option value="">{t.languagePlaceholder}</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  {errors.targetLanguage && <span className="formError">{errors.targetLanguage}</span>}
                </label>
              </div>

              <label className="formField">
                <span>{t.clientNameLabel}</span>
                <input
                  type="text"
                  maxLength={150}
                  value={values.clientName}
                  onChange={field("clientName")}
                  placeholder={t.clientNamePlaceholder}
                  autoComplete="name"
                />
                {errors.clientName && <span className="formError">{errors.clientName}</span>}
              </label>

              <div className="formRow">
                <label className="formField">
                  <span>{t.phoneLabel}</span>
                  <input
                    type="tel"
                    value={values.phone}
                    onChange={field("phone")}
                    placeholder={t.phonePlaceholder}
                    autoComplete="tel"
                  />
                  {errors.phone && <span className="formError">{errors.phone}</span>}
                </label>

                <label className="formField">
                  <span>{t.emailLabel}</span>
                  <input
                    type="email"
                    value={values.email}
                    onChange={field("email")}
                    placeholder={t.emailPlaceholder}
                    autoComplete="email"
                  />
                  {errors.email && <span className="formError">{errors.email}</span>}
                </label>
              </div>

              <fieldset className="formField formFieldset">
                <legend>{t.preferredContactLabel}</legend>
                <div className="contactOptions">
                  {PREFERRED_CONTACTS.map((option) => (
                    <label key={option} className="radioOption">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={option}
                        checked={values.preferredContact === option}
                        onChange={field("preferredContact")}
                      />
                      {t.preferredContactOptions[option]}
                    </label>
                  ))}
                </div>
                {errors.preferredContact && <span className="formError">{errors.preferredContact}</span>}
              </fieldset>

              <label className="formField">
                <span>{t.filesLabel}</span>
                <input
                  type="file"
                  multiple
                  accept={orderRequestApi.fileInputAccept}
                  onChange={onFilesSelected}
                />
                <span className="formHint">{t.filesHint}</span>
                {errors.files && <span className="formError">{errors.files}</span>}
              </label>

              {files.length > 0 && (
                <ul className="fileList">
                  {files.map((file, index) => (
                    <li key={`${file.name}-${index}`} className="fileListItem">
                      <span className="fileListName">
                        {file.name} <span className="fileListSize">({formatBytes(file.size)})</span>
                      </span>
                      <button
                        type="button"
                        className="fileRemove"
                        onClick={() => removeFile(index)}
                        aria-label={t.removeFileAria}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {status === "error" && <p className="formError formErrorGeneric">{t.errorGeneric}</p>}

              <button type="submit" className="submitButton" disabled={status === "submitting"}>
                {status === "submitting" ? t.submittingButton : t.submitButton}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
