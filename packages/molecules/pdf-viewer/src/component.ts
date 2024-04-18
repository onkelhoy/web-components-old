// system
import { html, property, ifDefined, query, CustomElement } from "@pap-it/system-utils";

// atoms
import "@pap-it/button";
import "@pap-it/icon";
import "@pap-it/typography";

// tools
import "@pap-it/tools-translator";

// local
import { style } from "./style";
import { Type } from './types';

export class PDFviewer extends CustomElement {
  static style = style;

  @query<HTMLAnchorElement>('a.download') downloadElement!: HTMLAnchorElement;
  @property() name?: string;
  @property() type: Type = "object";
  @property({ type: Number }) height?: number;
  @property() url?: string;

  private source?: File | Blob = undefined;

  public set file(source: any) {
    if (source instanceof Blob || source instanceof File) {
      this.source = new Blob([source], { type: 'application/pdf' });
      this.url = URL.createObjectURL(this.source);
    }
    else {
      console.error('[ERROR] (pdf-viewer) can only support Blob or File, use url instead!');
    }
  }

  // event handlers
  private handledownload = (e: Event) => {
    if (!this.downloadElement) {
      console.error("[ERROR] anchor element hasen't been loaded yet, try again soon or refresh!");
      return;
    }
    // Check if there is a Blob/File source
    if (this.source) {
      // Create a URL for the Blob/File
      const blobUrl = window.URL.createObjectURL(this.source);
      // Create an anchor element for downloading
      this.downloadElement.href = blobUrl;
      this.downloadElement.download = this.name || "pdf-file";
      this.downloadElement.click();

      // Free up the Blob URL
      window.URL.revokeObjectURL(blobUrl);
    }
    // Check if there is a URL source
    else if (this.url) {
      // Create an anchor element for downloading
      this.downloadElement.href = this.url;
      this.downloadElement.download = this.name || "pdf-file";
      this.downloadElement.click();
    }
    // Handle the case where there is no data to download
    else {
      console.error("[ERROR]: (pdf-viewer) there's no data to download!")
    }
  }

  private renderfallback() {
    return html`
      <div part="fallback">
        <pap-typography part="download-text">
          <pap-translator>Your browser does not support PDFs. Please download the PDF to view it:</pap-translator>
        </pap-typography>
        <pap-button @click="${this.handledownload}" part="download-button" variant="outlined" color="secondary">
          <pap-icon size="small" container="small" slot="prefix" cache="true" name="download"></pap-icon>
          <pap-translator>Download PDF</pap-translator>
        </pap-button>
      </div>
    `
  }
  private renderengine() {
    switch (this.type) {
      case "iframe":
        return html`
          <iframe
            part="renderer"
            src="${ifDefined(this.url)}"
            height="${ifDefined(this.height)}"
          >
            ${this.renderfallback()}
          </iframe>
        `;

      case "embed":
        return html`
          <embed
            type="application/pdf"
            part="renderer"
            src="${ifDefined(this.url)}"
            height="${ifDefined(this.height)}"
          >
        `;

      default:
        return html`
          <object
            type="application/pdf"
            part="renderer"
            data="${ifDefined(this.url)}"
            height="${ifDefined(this.height)}"
          >
            ${this.renderfallback()}
          </object>
        `
    }
  }

  render() {
    return html`
      ${this.renderengine()}
      <a style="display:none;" class="download"></a>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-pdf-viewer": PDFviewer;
  }
}