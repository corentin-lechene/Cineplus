export class Profile {
    firstname: string;
    lastname: string;

    private constructor(firstname: string, lastname: string) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    static of(firstname: string, lastname: string) {
        return new Profile(firstname, lastname);
    }

    fullName() {
        return `${this.firstname.capitalize()} ${this.lastname.capitalize()}`
    }
}