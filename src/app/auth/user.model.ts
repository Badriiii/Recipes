export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpiryDate: Date
    ) { }

    // will be accessed by user.token(property getter)
    get token() {
        if (!this._tokenExpiryDate || new Date() > this._tokenExpiryDate) {
            return null;
        }
        return this._token
    }
}