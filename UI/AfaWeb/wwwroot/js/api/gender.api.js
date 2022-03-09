var genderApi = class {
    constructor() {
        this.apiControllerUrl = `/Gender`;
    }

    async getGendersAsync() {
        var getGendersAsyncUrl = `${this.apiControllerUrl}/GetGenders`;
        return await xhr.getAsync(getGendersAsyncUrl);
    }

}