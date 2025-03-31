export default class Formatting {
    static FormatDuration(secs: number): string {
        const months = Math.floor(secs / 2592000);
        const days = Math.floor(secs / 86400);
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);

        if (months > 0) return (months > 1) ? (months + " months ") : (months + " month ");
        if (days > 0) return (days > 1) ? (days + " days ") : (days + " day ");
        if (hours > 0) return (hours > 1) ? (hours + " hours ") : (hours + " hour ");
        if (minutes > 0) return (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
        if (seconds >= 30) return (seconds > 1) ? (seconds + " seconds") : (seconds + " second");

        return "just now";
    }

    static FormatAgo(secs: number): string {
        const formatted = Formatting.FormatDuration(Date.now() / 1000 - secs);

        if (formatted !== "just now")
            return formatted + " ago";

        return formatted;
    }
}