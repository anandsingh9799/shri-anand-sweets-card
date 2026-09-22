const ENQUIRY_MESSAGE =
  "Hello, I am interested in the wholesale sweets range of SHRI ANAND SWEETS & FOODS. Please share the catalogue and wholesale details.";

const ENQUIRY_URL = `https://wa.me/917389161808?text=${encodeURIComponent(ENQUIRY_MESSAGE)}`;

const enquiryLink = document.getElementById("wholesale-enquiry");
const saveContactButton = document.getElementById("save-contact");
const shareCardButton = document.getElementById("share-card");
const shareStatus = document.getElementById("share-status");

if (enquiryLink) {
  enquiryLink.href = ENQUIRY_URL;
}

const vCardData = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:SHRI ANAND SWEETS & FOODS",
  "ORG:SHRI ANAND SWEETS & FOODS",
  "TITLE:Wholesale Sweets Supplier",
  "TEL;TYPE=WORK,VOICE:+919680422907",
  "TEL;TYPE=CELL:+917389161808",
  "ADR;TYPE=WORK:;;Karnal;Haryana;;India",
  "NOTE:Manufacturing Units - Karnal, Haryana; Pali, Rajasthan",
  "END:VCARD",
].join("\n");

if (saveContactButton) {
  saveContactButton.addEventListener("click", () => {
    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "shri-anand-sweets-foods.vcf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  });
}

async function shareCard() {
  const sharePayload = {
    title: "SHRI ANAND SWEETS & FOODS",
    text: "Wholesale Sweets Supplier | Karnal, Haryana",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(sharePayload);
      shareStatus.textContent = "Shared successfully.";
      return;
    } catch (error) {
      if (error && error.name === "AbortError") {
        shareStatus.textContent = "Share cancelled.";
      }
    }
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    shareStatus.textContent = "Link copied. Paste to share this card.";
  } catch {
    shareStatus.textContent = "Copy not supported. Please copy this page URL manually.";
  }
}

if (shareCardButton) {
  shareCardButton.addEventListener("click", shareCard);
}
