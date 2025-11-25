import { z } from "zod";

z.config({
  customError: (iss) => {
    // Customize specific error types
    if (iss.code === "too_small") {
      if (iss.origin === "string") {
        if (iss.minimum === 1) {
          return "Ce champ est requis";
        }
        return `Minimum ${iss.minimum} caractères requis`;
      }
      if (iss.origin === "array") {
        return "Au moins un élément requis";
      }
    }

    if (iss.code === "too_big") {
      if (iss.origin === "string") {
        const max = iss.maximum;
        return `Maximum ${max} caractères autorisés`;
      }
    }

    if (iss.code === "invalid_type") {
      if (iss.expected === "string") {
        return "Ce champ doit être du texte";
      }
    }

    // Return undefined to use the locale default for other cases
    return "Champ invalide";
  },
});
