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

export function DownloadObjectJSON(obj: object, filename: string) {
    const json = JSON.stringify(obj);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();

    window.URL.revokeObjectURL(url);
}
