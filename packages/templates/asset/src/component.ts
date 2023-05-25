import { BaseTemplate } from "@circular-templates/base";
import { property } from "@circular-tools/utils";

export class AssetTemplate extends BaseTemplate {
    @property({ onUpdate: "assetBaseUpdate" }) assetBase:string = "/public";
    @property({ type: Boolean }) cache:boolean = false;

    protected async loadAsset(file: string, isurl=false): Promise<string | Response | null> {
        try {
            let filename = file;
            if (filename[0] === "/") filename = filename.slice(1, filename.length);

            const url = isurl ? file : `${this.assetBase}/${filename}`;

            if (this.cache)
            {
                const item = window.localStorage.getItem(`o-assets-${url}`);
                if (item)
                {
                    return item;
                }
            }

            const response = await fetch(url);

            if (response.ok) {
                return response;
            } else {
                console.error('Error fetching asset:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching asset:', error);
        }
        return null;
    }

    private assetBaseUpdate() {
        if (this.assetBase[this.assetBase.length - 1] === "/")
        {
            this.assetBase = this.assetBase.slice(0, this.assetBase.length - 1);
        }
    }

    protected cacheData(file:string, data:string) {
        let filename = file;
        if (filename[0] === "/") filename = filename.slice(1, filename.length);

        const url = `${this.assetBase}/${filename}`;

        window.localStorage.setItem(`o-assets-${url}`, data);
    }
}



