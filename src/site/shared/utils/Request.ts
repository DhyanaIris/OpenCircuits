
type Props = {
    method: "GET" | "POST" | "PUT";
    url: string;
    headers: Record<string, string>;
    data?: string;
    async?: boolean;
}
export function Request({ method, url, headers, data, async }: Props): Promise<string> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Open request
        xhr.open(method, url, async ?? true);

        // Set headers
        Object.entries(headers).forEach(([name, value]) => xhr.setRequestHeader(name, value));

        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                resolve(this.response);
            else
                reject(this.response);
        }
        xhr.onabort = xhr.onerror = xhr.ontimeout = (ev) => reject(ev);

        xhr.send(data);
    })
}