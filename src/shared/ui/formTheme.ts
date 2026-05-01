export const themeInputClassNames = {
  base: "w-full",
  label: "theme-text-muted",
  mainWrapper: "theme-text",
  inputWrapper:
    "theme-surface border theme-border shadow-none data-[hover=true]:border-(--primary-color)/35 data-[focus=true]:border-(--primary-color)/60 data-[focus-visible=true]:border-(--primary-color)/60",
  innerWrapper: "theme-text",
  input:
    "theme-text placeholder:text-[var(--muted-foreground)] placeholder:opacity-100",
  clearButton: "theme-text-muted",
  helperWrapper: "theme-text-muted",
  description: "theme-text-muted",
  errorMessage: "text-danger",
} as const;

export const themeTextareaClassNames = {
  ...themeInputClassNames,
  inputWrapper:
    "theme-surface border theme-border shadow-none data-[hover=true]:border-(--primary-color)/35 data-[focus=true]:border-(--primary-color)/60 data-[focus-visible=true]:border-(--primary-color)/60",
} as const;

export const themeSelectClassNames = {
  base: "w-full",
  label: "theme-text-muted",
  mainWrapper: "theme-text",
  trigger:
    "theme-surface border theme-border shadow-none data-[hover=true]:border-(--primary-color)/35 data-[focus=true]:border-(--primary-color)/60 data-[focus-visible=true]:border-(--primary-color)/60",
  innerWrapper: "theme-text",
  value: "theme-text",
  selectorIcon: "text-(--primary-color)",
  helperText: "theme-text-muted",
  description: "theme-text-muted",
  errorMessage: "text-danger",
  popoverContent: "theme-surface border theme-border",
  listboxWrapper: "theme-surface border theme-border",
  listbox: "theme-surface",
} as const;

export const themeDateInputClassNames = {
  base: "w-full",
  label: "theme-text-muted",
  inputWrapper:
    "theme-surface border theme-border shadow-none data-[hover=true]:border-(--primary-color)/35 data-[focus=true]:border-(--primary-color)/60 data-[focus-visible=true]:border-(--primary-color)/60",
  input: "theme-text",
  innerWrapper: "theme-text",
  segment: "theme-text",
  helperWrapper: "theme-text-muted",
  description: "theme-text-muted",
  errorMessage: "text-danger",
} as const;
