// system
import { CustomElement, property } from "@pap-it/system-utils";

export class Asset extends CustomElement {

  @property({
    attribute: "asset-base",
    set: function (this: Asset, value: string) {
      if (value[value.length - 1] === "/") {
        value = value.slice(0, value.length - 1);
      }
      return value;
    },
    after: function (this: Asset) {
      this.debouncedLoadAsset();
    }
  }) assetBase: string = "/public";
  @property({ type: Boolean }) cache: boolean = false;
  @property({
    after: function (this: Asset) {
      this.debouncedLoadAsset();
    }
  }) file!: string;
  @property({
    after: function (this: Asset) {
      this.debouncedLoadAsset();
    }
  }) url?: string;


  // constructor() {
  //   super();

  //   // this.debouncedLoadAsset = debounce(this.debouncedLoadAsset, 10);
  // }
  private debouncedLoadAsset() {
    if (this.file) {
      this.loadAsset(this.file, !!this.url);
    }
  }
  protected async loadAsset(file: string, isurl = false): Promise<string | Response | null> {
    try {
      let filename = file;
      if (filename[0] === "/") filename = filename.slice(1, filename.length);

      const url = isurl ? file : `${this.assetBase}/${filename}`;

      if (this.cache) {
        const item = window.localStorage.getItem(`pap-assets-${url}`);
        if (item) {
          this.handleResponse(item);
          return item;
        }
      }

      const response = await fetch(url);

      if (response.ok) {

        this.handleResponse(response);
        return response;
      }

      this.handleError(response);
    } catch (error) {
      this.handleError(null, error);
    }
    return null;
  }

  protected handleError(response: Response | null, error?: any) {
    if (response) {
      console.error('Error fetching asset:', response.status, response.statusText);
    }
    else if (error) {
      console.error('Something went wrong fetching asset:', error);
    }
  }
  protected handleResponse(response: Response | string) {
    console.log('well look at that, a response!');
  }
  protected cacheData(file: string, data: string) {
    let filename = file;
    if (filename[0] === "/") filename = filename.slice(1, filename.length);

    const url = `${this.assetBase}/${filename}`;

    window.localStorage.setItem(`pap-assets-${url}`, data);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-asset-template": Asset;
  }
}