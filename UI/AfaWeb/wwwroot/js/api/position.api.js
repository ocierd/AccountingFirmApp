var positionApi = class {
    constructor() {
        this.apiControllerUrl = `/Position`;
    }

    async getPositionsAsync() {
        var getPositionsAsyncUrl = `${this.apiControllerUrl}/GetPositions`;
        return await xhr.getAsync(getPositionsAsyncUrl);
    }

}