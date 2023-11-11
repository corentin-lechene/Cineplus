declare global {
    interface String {
        capitalize(): string
    }
}

String.prototype.capitalize = () => {
    if (!this) return "";
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export {}
