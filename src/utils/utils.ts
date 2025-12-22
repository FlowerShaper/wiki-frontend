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
