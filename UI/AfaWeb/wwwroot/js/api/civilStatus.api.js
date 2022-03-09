var civilStatusApi = class {
    constructor() {
        this.apiControllerUrl = `/CivilStatus`;
    }

    async getCivilStatusAsync() {
        var getCivilStatusAsyncUrl = `${this.apiControllerUrl}/GetCivilStatus`;
        return await xhr.getAsync(getCivilStatusAsyncUrl);
    }

}