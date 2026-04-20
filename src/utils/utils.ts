export function SetMetadata(title: string, description: string, thumb?: string) {
    useSeoMeta({
        title: title,
        ogTitle: title,
        ogDescription: description,
        ogSiteName: 'Camellia Wiki',
        themeColor: '#a3a2d8',
        ogType: 'website',
        ogImage: thumb,
    });
}

export function DownloadTextFile(str: string, filename: string, mime: string) {
    const blob = new Blob([str], { type: mime });
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();

    window.URL.revokeObjectURL(url);
}

export function DownloadObjectJSON(obj: object, filename: string) {
    const json = JSON.stringify(obj);
    DownloadTextFile(json, filename, 'application/json');
}
